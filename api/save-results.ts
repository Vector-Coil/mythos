const DATABASE_URL = process.env.DATABASE_URL
if(!DATABASE_URL) console.warn('No DATABASE_URL configured — save-results API will fail without a database')

let pool: any
function getPool(){
  if(pool) return pool
  // @ts-ignore
  if((global as any).__mysqlPool) { pool = (global as any).__mysqlPool; return pool }

  const mysql2 = require('mysql2')

  const useSsl = DATABASE_URL && /[?&]ssl=(true|1)/i.test(DATABASE_URL)
  let cfg: any
  if(useSsl){
    const u = new URL(DATABASE_URL)
    cfg = { host: u.hostname, port: u.port ? Number(u.port) : undefined, user: decodeURIComponent(u.username), password: decodeURIComponent(u.password), database: u.pathname ? u.pathname.replace(/^\//,'') : undefined, waitForConnections: true, connectionLimit: 10, ssl: { rejectUnauthorized: false } }
  }else{
    cfg = DATABASE_URL
  }

  pool = mysql2.createPool(cfg).promise()
  // @ts-ignore
  ;(global as any).__mysqlPool = pool
  return pool
}

async function ensureTable(){
  const p = getPool()
  await p.query(`
    CREATE TABLE IF NOT EXISTS mythos (
      id VARCHAR(64) PRIMARY KEY,
      user_id VARCHAR(128),
      created_at DATETIME,
      seed VARCHAR(255),
      prim JSON,
      scores JSON,
      svg TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)
}

async function handler(req:any, res:any){
  if(req.method !== 'POST'){
    res.setHeader('Allow','POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const body = req.body
  if(!body || !body.mythos){
    return res.status(400).json({ error: 'Missing `mythos` in request body' })
  }

  try{
    const p = getPool()
    await ensureTable()
    const id = `mythos_${Date.now()}`
    const now = new Date()
    const m = body.mythos
    await p.query('INSERT INTO mythos (id, user_id, created_at, seed, prim, scores, svg) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, m.userId || null, now, m.seed || null, JSON.stringify(m.prim || {}), JSON.stringify(m.scores || {}), m.svg || null])
    return res.status(200).json({ ok: true, id })
  }catch(err:any){
    console.error('save-results error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: String(err), stack: err && err.stack ? err.stack : undefined })
  }
}

module.exports = handler
