const DATABASE_URL = process.env.DATABASE_URL

export default async function handler(req:any, res:any){
  try{
    if(req.method !== 'POST'){
      res.setHeader('Allow','POST')
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    if(!DATABASE_URL) return res.status(500).json({ error: 'DATABASE_URL not configured' })

    const mysql = require('mysql2/promise')
    // reuse pool
    // @ts-ignore
    let pool = (global as any).__mysqlPool
    if(!pool){
      const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
      const cfg: any = { uri: DATABASE_URL, waitForConnections: true, connectionLimit: 5 }
      if(useSsl) cfg.ssl = { rejectUnauthorized: false }
      pool = mysql.createPool(cfg)
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

    if(!email) return res.status(400).json({ error: 'email required' })

    if(action === 'register'){
      const [rows] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
      if(Array.isArray(rows) && (rows as any[]).length > 0){
        return res.status(409).json({ error: 'User exists' })
      }
      const id = `user_${Date.now()}`
      const now = new Date()
      await pool.query('INSERT INTO users (id, email, password, name, created_at) VALUES (?, ?, ?, ?, ?)', [id, email, password, name, now])
      return res.status(200).json({ ok: true, user: { id, email, name } })
    }

    if(action === 'login'){
      const [rows] = await pool.query('SELECT id, email, name FROM users WHERE email = ? AND password = ? LIMIT 1', [email, password])
      if(!Array.isArray(rows) || (rows as any[]).length === 0) return res.status(401).json({ error: 'Invalid credentials' })
      const u = (rows as any[])[0]
      return res.status(200).json({ ok: true, user: { id: u.id, email: u.email, name: u.name } })
    }

    return res.status(400).json({ error: 'unknown action' })
  }catch(err:any){
    console.error('user API error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err) })
  }
}
