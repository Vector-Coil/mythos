#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

// Load .env.local for local development so DATABASE_URL is available
try{
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })
}catch(e){ /* ignore if dotenv not installed */ }

async function main(){
  const databaseUrl = process.env.DATABASE_URL
  if(!databaseUrl){
    console.error('DATABASE_URL not set. Create a .env.local or set env var.')
    process.exit(1)
  }

  console.log('Connecting to database...')
  // mysql2 expects `ssl` to be an object, not a boolean query param.
  // Parse DATABASE_URL and pass explicit connection options.
  const useSsl = /[?&]ssl=(true|1)/i.test(databaseUrl)
  const u = new URL(databaseUrl)
  const poolLimit = Number(process.env.DB_POOL_LIMIT || process.env.DB_CONN_LIMIT || 4)
  const poolConfig = {
    host: u.hostname,
    port: u.port ? Number(u.port) : undefined,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname ? u.pathname.replace(/^\//,'') : undefined,
    waitForConnections: true,
    connectionLimit: poolLimit
  }
  if(useSsl) poolConfig.ssl = { rejectUnauthorized: false }
  const pool = mysql.createPool(poolConfig)

  try{
    const migrationsDir = path.resolve(__dirname, '..', 'migrations')
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()
    for(const file of files){
      const full = path.join(migrationsDir, file)
      const sql = fs.readFileSync(full, 'utf8')
      console.log('Running migration:', file)
      // split by ; to allow multiple statements if needed
      const statements = sql.split(/;\s*\n/).map(s=>s.trim()).filter(Boolean)
      for(const stmt of statements){
        await pool.query(stmt)
      }
    }
    console.log('Migrations complete')
    process.exit(0)
  }catch(err){
    console.error('Migration error', err)
    process.exit(2)
  }finally{
    await pool.end()
  }
}

main()
