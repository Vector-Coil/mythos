import React, { useState } from 'react'
import { authenticateWithFarcaster } from '../auth/farcaster'
import { signup, signin, signout, currentSession, resetProgressByUser } from '../auth/email'

export default function Auth({onAuth}:{onAuth:(user:any)=>void}){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState<string|null>(null)

  async function handleSignup(){
    try{ const user = await signup(email, pass); onAuth(user) }catch(e:any){ setError(e.message || String(e)) }
  }
  async function handleSignin(){
    try{ const user = await signin(email, pass); onAuth(user) }catch(e:any){ setError(e.message || String(e)) }
  }
  async function handleFarcaster(){
    const u = await authenticateWithFarcaster()
    onAuth(u)
  }

  const session = currentSession()
  if(session) return (
    <div style={{marginBottom:12}}>
      <div>Signed in as <strong>{session.email || session.id}</strong></div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn" onClick={()=>{ signout(); window.location.reload() }}>Sign out</button>
        <button className="btn" onClick={async ()=>{
          if(!confirm('Wipe all active progress for this account? This cannot be undone.')) return
          const r = await resetProgressByUser(session.id)
          if(!r.ok) alert('Reset failed: '+(r.body && r.body.error ? r.body.error : r.status))
          else alert('Progress reset')
        }}>Reset progress</button>
      </div>
    </div>
  )

  return (
    <div className="card" style={{marginBottom:12}}>
      <h4>Sign in</h4>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
      <input placeholder="password" type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
      <div style={{display:'flex',gap:8}}>
        <button className="btn" onClick={handleSignin}>Sign in</button>
        <button className="btn" onClick={handleSignup}>Create</button>
        <button className="btn" onClick={handleFarcaster}>Farcaster</button>
      </div>
      {error && <div style={{color:'#fca5a5',marginTop:8}}>{error}</div>}
    </div>
  )
}
