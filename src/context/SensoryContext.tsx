import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { startAmbient, stopAmbient, setLevel as ambientSetLevel, setBeat as ambientSetBeat, setBaseHz as ambientSetBase, isRunning } from '../lib/ambient'

type SensoryState = {
  on: boolean
  level: number // 0-100
  beat: number
  base: number
  sensory: boolean
  toggle: () => void
  setSensory: (v:boolean)=>void
  setLevel: (v:number)=>void
  setBeat: (v:number)=>void
  setBase: (v:number)=>void
}

const SensoryCtx = createContext<SensoryState | null>(null)

function readNum(key:string, fallback:number){
  try{ const v = Number(localStorage.getItem(key)); return Number.isFinite(v) && v > 0 ? v : fallback }catch{ return fallback }
}

export function SensoryProvider({ children }:{ children:React.ReactNode }){
  const [on, setOn] = useState<boolean>(()=>{ try{ return localStorage.getItem('mythos_ambient_on') === '1' }catch{ return false } })
  const [level, setLevelState] = useState<number>(()=> readNum('mythos_ambient_level', 20))
  const [beat, setBeatState] = useState<number>(()=> readNum('mythos_ambient_beat', 6))
  const [base, setBaseState] = useState<number>(()=> readNum('mythos_ambient_base', 240))
  const [sensory, setSensoryState] = useState<boolean>(()=>{ try{ return localStorage.getItem('mythos_sensory') === '1' }catch{ return false } })

  useEffect(()=>{
    // apply ambient module params when changed
    try{ ambientSetLevel((level/100) * 0.08) }catch(e){}
  }, [level])

  useEffect(()=>{ try{ ambientSetBeat(beat) }catch(e){} }, [beat])
  useEffect(()=>{ try{ ambientSetBase(base) }catch(e){} }, [base])

  useEffect(()=>{
    // respond to storage events (cross-tab sync)
    function onStorage(e:StorageEvent){
      if(!e.key) return
      if(e.key === 'mythos_ambient_on') setOn(localStorage.getItem('mythos_ambient_on') === '1')
      if(e.key === 'mythos_ambient_level') setLevelState(readNum('mythos_ambient_level', 20))
      if(e.key === 'mythos_ambient_beat') setBeatState(readNum('mythos_ambient_beat', 6))
      if(e.key === 'mythos_ambient_base') setBaseState(readNum('mythos_ambient_base', 240))
      if(e.key === 'mythos_sensory') setSensoryState(localStorage.getItem('mythos_sensory') === '1')
    }
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(()=>{
    // ensure module reflects `on` state
    try{
      if(on){ startAmbient() }
      else { if(isRunning()) stopAmbient() }
    }catch(e){}
    try{ localStorage.setItem('mythos_ambient_on', on ? '1' : '0') }catch(e){}
  }, [on])

  const toggle = ()=> setOn(v=>!v)

  const setLevel = (v:number)=>{ setLevelState(v); try{ localStorage.setItem('mythos_ambient_level', String(v)) }catch{} }
  const setBeat = (v:number)=>{ setBeatState(v); try{ localStorage.setItem('mythos_ambient_beat', String(v)) }catch{} }
  const setBase = (v:number)=>{ setBaseState(v); try{ localStorage.setItem('mythos_ambient_base', String(v)) }catch{} }
  const setSensory = (v:boolean)=>{ setSensoryState(v); try{ localStorage.setItem('mythos_sensory', v ? '1' : '0') }catch{} }

  const api = useMemo(()=>({ on, level, beat, base, sensory, toggle, setSensory, setLevel, setBeat, setBase }), [on, level, beat, base, sensory])

  return <SensoryCtx.Provider value={api}>{children}</SensoryCtx.Provider>
}

export function useSensory(){
  const ctx = useContext(SensoryCtx)
  if(!ctx) throw new Error('useSensory must be used within SensoryProvider')
  return ctx
}
