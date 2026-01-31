import mysql from 'mysql2/promise'

const DATABASE_URL = process.env.DATABASE_URL

function buildPool(){
  if(!DATABASE_URL) throw new Error('DATABASE_URL is not defined')
  const useSsl = /[?&]ssl=(true|1)/i.test(DATABASE_URL)
  const cfg: any = { uri: DATABASE_URL, waitForConnections: true, connectionLimit: 2 }
  if(useSsl) cfg.ssl = { rejectUnauthorized: false }
  return mysql.createPool(cfg)
}

export default async function handler(req:any, res:any){
  try{
    const pool = buildPool()
    const [rows] = await pool.query('SELECT 1 as ok')
    await pool.end()
    return res.status(200).json({ ok: true, rows })
  }catch(err:any){
    // Return detailed error for debugging (temporary)
    console.error('health error', err)
    return res.status(500).json({ ok: false, error: String(err), stack: err.stack })
  }
}
