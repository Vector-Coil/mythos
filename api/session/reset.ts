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
      const u = new URL(DATABASE_URL)
      const poolLimit = Number(process.env.DB_POOL_LIMIT || process.env.DB_CONN_LIMIT || 5)
      let cfg: any = {
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

    // If Authorization header present, verify JWT and use that user id instead
    const auth = req.headers?.authorization || req.headers?.Authorization
    if(auth && typeof auth === 'string' && auth.startsWith('Bearer ')){
      const token = auth.slice(7)
      const jwt = require('jsonwebtoken')
      const SESSION_SECRET = process.env.SESSION_SECRET
      if(!SESSION_SECRET) return res.status(500).json({ error: 'SESSION_SECRET not configured' })
      try{
        const payload = jwt.verify(token, SESSION_SECRET)
        if(payload && (payload as any).id && (payload as any).jti) {
          // verify jti exists in auth_sessions
          const jti = (payload as any).jti
          const uid = (payload as any).id
          const [found] = await pool.query('SELECT jti FROM auth_sessions WHERE jti = ? AND user_id = ? LIMIT 1', [jti, uid])
          if(!Array.isArray(found) || (found as any[]).length === 0) return res.status(401).json({ error: 'session not found' })
          // override userId with authenticated id
          const authed = uid
          await pool.query('UPDATE sessions SET current_index = 0, answers = ?, completed_at = NULL, updated_at = ? WHERE user_id = ?', [JSON.stringify([]), new Date(), authed])
          return res.status(200).json({ ok: true })
        }
      }catch(e:any){
        return res.status(401).json({ error: 'Invalid token' })
      }
    }

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

module.exports = handler
