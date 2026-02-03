function getDatabaseUrl(){ return process.env.DATABASE_URL }


let pool: any
function getPool(){
  if(pool) return pool
  // @ts-ignore
  if((global as any).__mysqlPool) { pool = (global as any).__mysqlPool; return pool }

  const DATABASE_URL = getDatabaseUrl()
  if(!DATABASE_URL) throw new Error('DATABASE_URL not configured')
  const mysql2 = require('mysql2')

  const useSsl = DATABASE_URL && /[?&]ssl=(true|1)/i.test(DATABASE_URL)
  let u: URL
  try{ u = new URL(DATABASE_URL) }catch(e){ throw new Error('Invalid DATABASE_URL: '+String(e)) }
  const poolLimit = Number(process.env.DB_POOL_LIMIT || process.env.DB_CONN_LIMIT || 10)
  const cfg: any = {
    host: u.hostname,
    port: u.port ? Number(u.port) : undefined,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname ? u.pathname.replace(/^\//,'') : undefined,
    waitForConnections: true,
    connectionLimit: poolLimit,
    queueLimit: 0,
    connectTimeout: 10000
  }
  if(useSsl) cfg.ssl = { rejectUnauthorized: false }

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
  const DATABASE_URL = getDatabaseUrl()

  // If no DATABASE_URL, use an in-memory mock store for development
  if(!DATABASE_URL){
    // @ts-ignore
    const mock = (global as any).__mockMythos = (global as any).__mockMythos || []

    if(req.method === 'GET'){
      try{
        const id = req.query && (req.query.id || req.query.ID)
        const userIdQ = req.query && (req.query.userId || req.query.user_id)
        if(id){
          const found = mock.find((m:any)=>m.id === id)
          if(!found) return res.status(404).json({ error: 'Not found' })
          return res.status(200).json({ mythos: found })
        }
        let rows = mock.slice(-100).reverse().map((m:any)=>({ id: m.id, user_id: m.userId || null, created_at: m.created_at, seed: m.seed }))
        if(userIdQ) rows = rows.filter((r:any)=>r.user_id === userIdQ)
        return res.status(200).json({ results: rows })
      }catch(err:any){
        console.error('save-results GET mock error', err)
        return res.status(500).json({ error: String(err) })
      }
    }

    if(req.method !== 'POST'){
      res.setHeader('Allow','GET, POST')
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const body = req.body
    if(!body || !body.mythos) return res.status(400).json({ error: 'Missing `mythos` in request body' })
    try{
      const m = body.mythos
      const id = `mythos_${Date.now()}`
      const now = new Date().toISOString()
      const rec = { id, userId: m.userId || null, created_at: now, seed: m.seed || null, prim: m.prim || {}, scores: m.scores || {}, svg: m.svg || null }
      mock.push(rec)
      return res.status(200).json({ ok: true, id })
    }catch(err:any){
      console.error('save-results mock error', err)
      return res.status(500).json({ error: String(err) })
    }
  }

  // Allow GET to fetch saved results (by id or recent list) and POST to save a result
  if(req.method === 'GET'){
    try{
      const p = getPool()
      await ensureTable()
      const id = req.query && (req.query.id || req.query.ID)
      const userIdQ = req.query && (req.query.userId || req.query.user_id)
      if(id){
        const [rows] = await p.query('SELECT id, user_id, created_at, seed, prim, scores, svg FROM mythos WHERE id = ? LIMIT 1', [id])
        const row = Array.isArray(rows) && (rows as any[])[0]
        if(!row) return res.status(404).json({ error: 'Not found' })
        // parse JSON fields
        try{ row.prim = row.prim ? JSON.parse(row.prim) : null }catch(e){}
        try{ row.scores = row.scores ? JSON.parse(row.scores) : null }catch(e){}
        return res.status(200).json({ mythos: row })
      }

      // list recent (optionally filter by user)
      if(userIdQ){
        const [rows] = await p.query('SELECT id, user_id, created_at, seed FROM mythos WHERE user_id = ? ORDER BY created_at DESC LIMIT 100', [userIdQ])
        return res.status(200).json({ results: rows })
      }
      const [rows] = await p.query('SELECT id, user_id, created_at, seed FROM mythos ORDER BY created_at DESC LIMIT 100')
      return res.status(200).json({ results: rows })
    }catch(err:any){
      console.error('save-results GET error', err && err.stack ? err.stack : err)
      return res.status(500).json({ error: String(err) })
    }
  }

  if(req.method !== 'POST'){
    res.setHeader('Allow','GET, POST')
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
