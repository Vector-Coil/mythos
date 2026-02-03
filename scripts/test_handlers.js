// Simple test harness to invoke the API handlers directly in Node (bypasses HTTP server)
const path = require('path')
process.env.NODE_ENV = 'test'
// Ensure DATABASE_URL is unset to exercise in-memory fallback
delete process.env.DATABASE_URL

function makeRes(){
  return {
    status(code){ this._status = code; return this },
    json(obj){ this._body = obj; return Promise.resolve({ status: this._status || 200, body: obj }) },
    setHeader(){}
  }
}

async function run(){
  const savePath = path.join(__dirname,'..','api','save-results.ts')
  const sessionPath = path.join(__dirname,'..','api','session.ts')
  // Require transpiled TS via ts-node not available; require the .ts file will work if Node supports it in this env because files use CommonJS patterns. Use require()
  const saveHandler = require(savePath)
  const sessionHandler = require(sessionPath)

  console.log('POST /api/save-results (mock)')
  const mythos = { userId: 'user_123', prim: { primary_archetype: 'archetype_sovereign' }, seed: 'a-b-c', scores: { archetype_sovereign: 100 }, svg: '<svg/>' }
  let res = makeRes()
  let req = { method: 'POST', body: { mythos } }
  let out = await saveHandler(req, res)
  console.log(out)

  console.log('\nGET /api/save-results (recent)')
  res = makeRes()
  req = { method: 'GET', query: {} }
  out = await saveHandler(req, res)
  console.log(out)

  console.log('\nGET /api/save-results by id')
  const id = out.body && out.body.results && out.body.results[0] && out.body.results[0].id
  res = makeRes()
  req = { method: 'GET', query: { id } }
  out = await saveHandler(req, res)
  console.log(out)

  console.log('\nPOST /api/session (mock create)')
  res = makeRes()
  req = { method: 'POST', body: { session: { userId: 'user_123', current_index: 2, answers: [] } } }
  out = await sessionHandler(req, res)
  console.log(out)

  console.log('\nGET /api/session (mock)')
  res = makeRes()
  req = { method: 'GET' }
  out = await sessionHandler(req, res)
  console.log(out)
}

run().catch(e=>{ console.error('test harness error', e); process.exit(1) })
