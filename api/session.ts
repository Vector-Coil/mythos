import mysql from 'mysql2/promise'

const DATABASE_URL = process.env.DATABASE_URL

if(!DATABASE_URL){
  console.warn('No DATABASE_URL configured — session API will fail without a database')
}

let pool: mysql.Pool | undefined
function getPool(){
  if(pool) return pool
  // reuse across invocations when possible (global cache)
  // @ts-ignore
  if((global as any).__mysqlPool) { pool = (global as any).__mysqlPool; return pool }
  pool = mysql.createPool({ uri: DATABASE_URL, waitForConnections: true, connectionLimit: 10 })
  // @ts-ignore
  (global as any).__mysqlPool = pool
  return pool
}

async function ensureTables(){
  const p = getPool()
  await p.query(`
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
}

export default async function handler(req:any, res:any){
  try{
    const p = getPool()
    await ensureTables()

    if(req.method === 'GET'){
      // return recent sessions (development)
      const [rows] = await p.query('SELECT id, user_id, created_at, updated_at, current_index, answers, completed_at FROM sessions ORDER BY created_at DESC LIMIT 200')
      return res.status(200).json({ sessions: (rows as any[]) })
    }

    if(req.method === 'POST'){
      const body = req.body
      if(!body || !body.session) return res.status(400).json({ error: 'Missing `session` in request body' })

      const s = body.session
      const now = new Date()
      if(s.id){
        // try update existing
        const [result] = await p.query('SELECT 1 FROM sessions WHERE id = ? LIMIT 1', [s.id])
        const exists = Array.isArray(result) && (result as any[]).length > 0
        if(exists){
          await p.query('UPDATE sessions SET user_id = ?, updated_at = ?, current_index = ?, answers = ?, completed_at = ? WHERE id = ?', [s.userId || null, now, s.current_index || null, JSON.stringify(s.answers || []), s.completed_at || null, s.id])
          return res.status(200).json({ ok: true, id: s.id })
        }
      }

      // insert new session
      const id = s.id || `session_${Date.now()}`
      await p.query('INSERT INTO sessions (id, user_id, created_at, updated_at, current_index, answers, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, s.userId || null, now, now, s.current_index || 0, JSON.stringify(s.answers || []), s.completed_at || null])
      return res.status(200).json({ ok: true, id })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }catch(err:any){
    console.error('session API error', err)
    return res.status(500).json({ error: String(err) })
  }
}
