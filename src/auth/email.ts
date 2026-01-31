// Simple email-based auth using localStorage for the prototype only.
// Not secure for production — use a real backend and hashed passwords.

const STORAGE_KEY = 'mythos_users_v1'
const SESSION_KEY = 'mythos_session_v1'

type User = { id:string; email:string; password?:string }

async function apiPost(path:string, body:any){
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const j = await res.json().catch(()=>null)
  return { ok: res.ok, status: res.status, body: j }
}

export async function signup(email:string, password:string){
  const r = await apiPost('/api/user', { action: 'register', email, password })
  if(!r.ok) throw new Error(r.body && r.body.error ? r.body.error : `status:${r.status}`)
  const user = r.body.user
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, token: 'local-'+user.id }))
  return { id: user.id, email: user.email }
}

export async function signin(email:string, password:string){
  const r = await apiPost('/api/user', { action: 'login', email, password })
  if(!r.ok) throw new Error(r.body && r.body.error ? r.body.error : `status:${r.status}`)
  const user = r.body.user
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, token: 'local-'+user.id }))
  return { id: user.id, email: user.email }
}

export function signout(){
  localStorage.removeItem(SESSION_KEY)
}

export function currentSession(){
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

export async function resetProgressByUser(userId:string){
  const r = await apiPost('/api/session/reset', { userId })
  return r
}
