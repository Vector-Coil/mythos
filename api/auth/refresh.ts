async function handler(req:any, res:any){
  try{
    if(req.method !== 'POST'){
      res.setHeader('Allow','POST')
      return res.status(405).json({ error: 'Method Not Allowed' })
    }
    const auth = req.headers?.authorization || req.headers?.Authorization
    if(!auth || typeof auth !== 'string' || !auth.startsWith('Bearer ')) return res.status(400).json({ error: 'Missing Authorization' })
    const token = auth.slice(7)
    const SESSION_SECRET = process.env.SESSION_SECRET
    if(!SESSION_SECRET) return res.status(500).json({ error: 'SESSION_SECRET not configured' })
    const jwt = require('jsonwebtoken')
    let payload
    try{ payload = jwt.verify(token, SESSION_SECRET) }catch(e:any){ return res.status(401).json({ error: 'Invalid token' }) }

    const DATABASE_URL = process.env.DATABASE_URL
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
        cfg = { host: u.hostname, port: u.port ? Number(u.port) : undefined, user: decodeURIComponent(u.username), password: decodeURIComponent(u.password), database: u.pathname ? u.pathname.replace(/^\//,'') : undefined, waitForConnections: true, connectionLimit: 2, ssl: { rejectUnauthorized: false } }
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

    const oldJti = (payload as any).jti
    const userId = (payload as any).id
    if(!oldJti || !userId) return res.status(400).json({ error: 'token missing jti or id' })

    // ensure old jti exists
    const [rows] = await pool.query('SELECT jti FROM auth_sessions WHERE jti = ? AND user_id = ? LIMIT 1', [oldJti, userId])
    if(!Array.isArray(rows) || (rows as any[]).length === 0) return res.status(401).json({ error: 'session not found' })

    const crypto = require('crypto')
    const newJti = crypto.randomUUID ? crypto.randomUUID() : `jti_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const now = new Date()
    const expires = new Date(Date.now() + 7*24*60*60*1000)
    // insert new session and delete old one
    await pool.query('INSERT INTO auth_sessions (jti, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)', [newJti, userId, now, expires])
    await pool.query('DELETE FROM auth_sessions WHERE jti = ?', [oldJti])
    const jwtLib = require('jsonwebtoken')
    const newToken = jwtLib.sign({ id: userId, jti: newJti }, SESSION_SECRET, { expiresIn: '7d' })
    return res.status(200).json({ ok: true, token: newToken })
  }catch(err:any){
    console.error('refresh error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err) })
  }
}

module.exports = handler
