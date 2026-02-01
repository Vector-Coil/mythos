const DATABASE_URL = process.env.DATABASE_URL

async function handler(req:any, res:any){
  try{
    if(!DATABASE_URL) return res.status(500).json({ ok: false, reason: 'DATABASE_URL not set' })

    // prefer the CJS mysql2 module and use the promise wrapper to avoid ESM/CJS import issues
    const mysql2 = require('mysql2')

    const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
    let cfg: any
    if(useSsl){
      const u = new URL(DATABASE_URL)
      cfg = { host: u.hostname, port: u.port ? Number(u.port) : undefined, user: decodeURIComponent(u.username), password: decodeURIComponent(u.password), database: u.pathname ? u.pathname.replace(/^\//,'') : undefined, waitForConnections: true, connectionLimit: 2, ssl: { rejectUnauthorized: false } }
    }else{
      cfg = DATABASE_URL
    }

    // inspect runtime shape before creating pool (diagnostic)
    try{
      const createPoolType = typeof (mysql2 && (mysql2 as any).createPool)
      if(createPoolType !== 'function'){
        const keys = Object.keys(mysql2 || {}).slice(0,20)
        const defaultKeys = mysql2 && (mysql2 as any).default ? Object.keys((mysql2 as any).default).slice(0,20) : undefined
        return res.status(500).json({ ok: false, error: 'mysql.createPool not a function', createPoolType, keys, defaultKeys })
      }
    }catch(e:any){
      return res.status(500).json({ ok: false, error: 'inspect failed', detail: String(e) })
    }

    // reuse pool across invocations when possible
    // @ts-ignore
    let pool = (global as any).__mysqlPool
    if(!pool){
      try{
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
          const mysqlP = require('mysql2/promise')
          pool = mysqlP.createPool(cfg)
        }
        // @ts-ignore
        (global as any).__mysqlPool = pool
      }catch(e:any){
        return res.status(500).json({ ok:false, error: 'createPool threw', message: String(e), stack: e && e.stack ? e.stack : undefined })
      }
    }

    const [rows] = await pool.query('SELECT 1 as ok')
    return res.status(200).json({ ok: true, rows })
  }catch(err:any){
    console.error('health check error', err && err.stack ? err.stack : err)
    return res.status(500).json({ ok: false, error: String(err), stack: err && err.stack ? err.stack : undefined })
  }
}

// CommonJS export for serverless runtime
// Vercel may run functions as CommonJS; ensure compatibility
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = handler
