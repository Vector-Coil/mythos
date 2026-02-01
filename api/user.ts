const DATABASE_URL = process.env.DATABASE_URL

async function handler(req:any, res:any){
  try{
    if(req.method !== 'POST'){
      res.setHeader('Allow','POST')
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    if(!DATABASE_URL) return res.status(500).json({ error: 'DATABASE_URL not configured' })

    const mysql2 = require('mysql2')
    // reuse pool
    // @ts-ignore
    let pool = (global as any).__mysqlPool
    if(!pool){
      const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
      let cfg: any
      if(useSsl){
        const u = new URL(DATABASE_URL)
        cfg = { host: u.hostname, port: u.port ? Number(u.port) : undefined, user: decodeURIComponent(u.username), password: decodeURIComponent(u.password), database: u.pathname ? u.pathname.replace(/^\//,'') : undefined, waitForConnections: true, connectionLimit: 5, ssl: { rejectUnauthorized: false } }
      }else{
        cfg = DATABASE_URL
      }
      let corePool: any
      try{
        corePool = mysql2.createPool(cfg)
        if(corePool && typeof corePool.promise === 'function'){
          pool = corePool.promise()
        }else if(corePool && typeof corePool.query === 'function'){
          pool = corePool
        }else{
          const mysqlP = require('mysql2/promise')
          pool = mysqlP.createPool(cfg)
        }
      }catch(e:any){
        try{
          const mysqlP = require('mysql2/promise')
          pool = mysqlP.createPool(cfg)
        }catch(e2:any){
          throw new Error('unable to create mysql pool: '+String(e2))
        }
      }
      // @ts-ignore
      (global as any).__mysqlPool = pool
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        name VARCHAR(255),
        created_at DATETIME
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    const body = req.body || {}
    const action = body.action || 'register'
    const email = (body.email || '').toLowerCase().trim()
    const password = body.password || null
    const name = body.name || null

    const SESSION_SECRET = process.env.SESSION_SECRET
    if(!SESSION_SECRET) return res.status(500).json({ error: 'SESSION_SECRET not configured' })

    if(!email) return res.status(400).json({ error: 'email required' })

    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')

    // ensure auth_sessions table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS auth_sessions (
        jti VARCHAR(128) PRIMARY KEY,
        user_id VARCHAR(64),
        created_at DATETIME,
        expires_at DATETIME
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    if(action === 'register'){
      const [rows] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
      if(Array.isArray(rows) && (rows as any[]).length > 0){
        return res.status(409).json({ error: 'User exists' })
      }
      const id = `user_${Date.now()}`
      const now = new Date()
      const hashed = password ? await bcrypt.hash(password, 10) : null
      await pool.query('INSERT INTO users (id, email, password, name, created_at) VALUES (?, ?, ?, ?, ?)', [id, email, hashed, name, now])

      // create server-side session (jti)
      const crypto = require('crypto')
      const jti = crypto.randomUUID ? crypto.randomUUID() : `jti_${Date.now()}_${Math.random().toString(36).slice(2)}`
      const expires = new Date(Date.now() + 7*24*60*60*1000)
      await pool.query('INSERT INTO auth_sessions (jti, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)', [jti, id, now, expires])
      const token = jwt.sign({ id, email, jti }, SESSION_SECRET, { expiresIn: '7d' })
      return res.status(200).json({ ok: true, user: { id, email, name }, token })
    }

    if(action === 'login'){
      const [rows] = await pool.query('SELECT id, email, name, password FROM users WHERE email = ? LIMIT 1', [email])
      if(!Array.isArray(rows) || (rows as any[]).length === 0) return res.status(401).json({ error: 'Invalid credentials' })
      const u = (rows as any[])[0]
      const match = u.password ? await bcrypt.compare(password || '', u.password) : false
      if(!match) return res.status(401).json({ error: 'Invalid credentials' })

      const crypto = require('crypto')
      const jti = crypto.randomUUID ? crypto.randomUUID() : `jti_${Date.now()}_${Math.random().toString(36).slice(2)}`
      const now = new Date()
      const expires = new Date(Date.now() + 7*24*60*60*1000)
      await pool.query('INSERT INTO auth_sessions (jti, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)', [jti, u.id, now, expires])
      const token = jwt.sign({ id: u.id, email: u.email, jti }, SESSION_SECRET, { expiresIn: '7d' })
      return res.status(200).json({ ok: true, user: { id: u.id, email: u.email, name: u.name }, token })
    }

    return res.status(400).json({ error: 'unknown action' })
  }catch(err:any){
    console.error('user API error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err) })
  }
}

module.exports = handler
