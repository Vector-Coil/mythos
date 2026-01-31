const DATABASE_URL = process.env.DATABASE_URL

export default async function handler(req:any, res:any){
  try{
    if(!DATABASE_URL) return res.status(500).json({ ok: false, error: 'DATABASE_URL not configured' })

      if(!DATABASE_URL) return res.status(500).json({ ok: false, reason: 'DATABASE_URL not set' })
      // lazy load mysql so import-time failures don't crash the function
      const mysql = require('mysql2/promise')
    const mysql = require('mysql2/promise')
    const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
    const cfg: any = { uri: DATABASE_URL, waitForConnections: true, connectionLimit: 2 }
      // reuse pool across invocations when possible
      // @ts-ignore
      let pool = (global as any).__mysqlPool
      if(!pool){
        pool = mysql.createPool(cfg)
        // @ts-ignore
        (global as any).__mysqlPool = pool
      }
    const pool = mysql.createPool(cfg)
    const [rows] = await pool.query('SELECT 1 as ok')
    await pool.end()
      console.error('health check error', err && err.stack ? err.stack : err)
  }catch(err:any){
    console.error('health error', err && err.stack ? err.stack : err)
    return res.status(500).json({ ok: false, error: String(err) })
  }
}
