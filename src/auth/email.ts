// Simple email-based auth using localStorage for the prototype only.
// Not secure for production — use a real backend and hashed passwords.

const STORAGE_KEY = 'mythos_users_v1'
const SESSION_KEY = 'mythos_session_v1'

type User = { id:string; email:string; password:string }

function loadUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveUsers(users: User[]){ localStorage.setItem(STORAGE_KEY, JSON.stringify(users)) }

export function signup(email:string, password:string){
  const users = loadUsers()
  if(users.find(u=>u.email===email)) throw new Error('User exists')
  const user = { id: 'user_'+Date.now(), email, password }
  users.push(user)
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, token: 'local-'+user.id }))
  return { id: user.id, email: user.email }
}

export function signin(email:string, password:string){
  const users = loadUsers()
  const user = users.find(u=>u.email===email && u.password===password)
  if(!user) throw new Error('Invalid credentials')
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, token: 'local-'+user.id }))
  return { id: user.id, email: user.email }
}

export function signout(){
  localStorage.removeItem(SESSION_KEY)
}

export function currentSession(){
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}
