import { describe, it, expect, beforeEach } from 'vitest'
import { signup, signin, signout, currentSession } from '../src/auth/email'

// Provide a minimal in-memory localStorage for Node test environment
if (typeof globalThis.localStorage === 'undefined') {
  const _store: Record<string,string> = {}
  // @ts-ignore
  globalThis.localStorage = {
    getItem(key:string){ return Object.prototype.hasOwnProperty.call(_store,key) ? _store[key] : null },
    setItem(key:string, value:string){ _store[key] = String(value) },
    removeItem(key:string){ delete _store[key] },
    clear(){ for(const k of Object.keys(_store)) delete _store[k] }
  }
}

beforeEach(()=>{ localStorage.clear() })

describe('email auth (localStorage prototype)', ()=>{
  it('can signup and signin', ()=>{
    const u = signup('a@b.test','pass')
    expect(u.email).toBe('a@b.test')
    signout()
    const s = signin('a@b.test','pass')
    expect(s.email).toBe('a@b.test')
    const session = currentSession()
    expect(session).toBeTruthy()
  })
})
