const DATABASE_URL = process.env.DATABASE_URL

export default async function handler(req:any, res:any){
  try{
    if(!DATABASE_URL) return res.status(500).json({ error: 'DATABASE_URL not configured' })

    // lazy-load mysql to avoid import-time failures
    const mysql = require('mysql2/promise')
    // reuse pool across invocations when possible
    // @ts-ignore
    let pool = (global as any).__mysqlPool
    if(!pool){
      const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
      const cfg: any = { uri: DATABASE_URL, waitForConnections: true, connectionLimit: 10 }
      if(useSsl) cfg.ssl = { rejectUnauthorized: false }
      pool = mysql.createPool(cfg)
      // @ts-ignore
      (global as any).__mysqlPool = pool
    }

    // ensure table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(128),
        created_at DATETIME,
        updated_at DATETIME,
        current_index INT,
        answers JSON,
        completed_at DATETIME
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    if(req.method === 'GET'){
      const [rows] = await pool.query('SELECT id, user_id, created_at, updated_at, current_index, answers, completed_at, JSON_EXTRACT(CONCAT('{"session":', COALESCE(answers, 'null'), '}'), "$.*") AS session FROM sessions ORDER BY created_at DESC LIMIT 200')
      return res.status(200).json({ sessions: (rows as any[]) })
    }

    if(req.method === 'POST'){
      const body = req.body
      if(!body || !body.session) return res.status(400).json({ error: 'Missing `session` in request body' })
      const s = body.session
      const now = new Date()
      if(s.id){
        const [result] = await pool.query('SELECT 1 FROM sessions WHERE id = ? LIMIT 1', [s.id])
        const exists = Array.isArray(result) && (result as any[]).length > 0
        if(exists){
          await pool.query('UPDATE sessions SET user_id = ?, updated_at = ?, current_index = ?, answers = ?, completed_at = ? WHERE id = ?', [s.userId || null, now, s.current_index || null, JSON.stringify(s.answers || []), s.completed_at || null, s.id])
          return res.status(200).json({ ok: true, id: s.id })
        }
      }

      const id = s.id || `session_${Date.now()}`
      await pool.query('INSERT INTO sessions (id, user_id, created_at, updated_at, current_index, answers, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, s.userId || null, now, now, s.current_index || 0, JSON.stringify(s.answers || []), s.completed_at || null])
      return res.status(200).json({ ok: true, id })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }catch(err:any){
    console.error('session API error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err) })
  }
}
