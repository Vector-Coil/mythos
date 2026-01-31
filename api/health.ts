const DATABASE_URL = process.env.DATABASE_URL

async function handler(req:any, res:any){
  try{
    if(!DATABASE_URL) return res.status(500).json({ ok: false, reason: 'DATABASE_URL not set' })

    let mysqlLib
    try{
      mysqlLib = require('mysql2/promise')
    }catch(e:any){
      console.error('mysql2 require failed', e && e.stack ? e.stack : e)
      return res.status(500).json({ ok: false, error: 'mysql2 module not found', detail: String(e) })
    }
    const mysql = (mysqlLib && typeof mysqlLib.createPool === 'function') ? mysqlLib : (mysqlLib && mysqlLib.default && typeof mysqlLib.default.createPool === 'function' ? mysqlLib.default : mysqlLib)

    const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
    const cfg: any = { uri: DATABASE_URL, waitForConnections: true, connectionLimit: 2 }
    if(useSsl) cfg.ssl = { rejectUnauthorized: false }

    // reuse pool across invocations when possible
    // @ts-ignore
    let pool = (global as any).__mysqlPool
    if(!pool){
      pool = mysql.createPool(cfg)
      // @ts-ignore
      (global as any).__mysqlPool = pool
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
