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

    const body = req.body || {}
    const sessionId = body.sessionId
    const userId = body.userId

    if(!sessionId && !userId) return res.status(400).json({ error: 'sessionId or userId required' })

    if(sessionId){
      await pool.query('UPDATE sessions SET current_index = 0, answers = ?, completed_at = NULL, updated_at = ? WHERE id = ?', [JSON.stringify([]), new Date(), sessionId])
      return res.status(200).json({ ok: true })
    }

    if(userId){
      await pool.query('UPDATE sessions SET current_index = 0, answers = ?, completed_at = NULL, updated_at = ? WHERE user_id = ?', [JSON.stringify([]), new Date(), userId])
      return res.status(200).json({ ok: true })
    }

    return res.status(400).json({ error: 'nothing done' })
  }catch(err:any){
    console.error('session reset error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err) })
  }
}
