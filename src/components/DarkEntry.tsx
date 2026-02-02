import React, { useState } from 'react'
import { useSensory } from '../context/SensoryContext'

function playClick(){
  try{
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)()
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.type = 'sine'
    o.frequency.value = 440
    o.connect(g); g.connect(ac.destination)
    g.gain.value = 0.001
    o.start()
    g.gain.exponentialRampToValueAtTime(0.08, ac.currentTime + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12)
    setTimeout(()=>{ o.stop(); ac.close() }, 160)
  }catch(e){ /* ignore */ }
}

export default function DarkEntry({ onBegin }:{ onBegin:()=>void }){
  const amb = useSensory()
  const sensory = amb.sensory

  function begin(){
    if(sensory){
      try{ navigator.vibrate && navigator.vibrate(50) }catch(e){}
      playClick()
      try{ amb.setLevel(amb.level) }catch(e){}
      try{ amb.setBeat(amb.beat) }catch(e){}
      try{ amb.toggle() }catch(e){}
    }
    onBegin()
  }

  function toggleSensory(){
    const next = !sensory
    try{ amb.setSensory(next) }catch(e){}
    if(next){
      try{ playClick() }catch(e){}
      try{ amb.setLevel(amb.level) }catch(e){}
      try{ amb.setBeat(amb.beat) }catch(e){}
      try{ if(!amb.on) amb.toggle() }catch(e){}
    }else{
      try{ if(amb.on) amb.toggle() }catch(e){}
    }
  }

  return (
    <div className="card reveal" style={{background:'#000',color:'#fff',textAlign:'center',padding:40}}>
      <div style={{opacity:0.95}}>
        <h2 style={{marginBottom:8}}>You have spent your life looking outward.</h2>
        <p style={{marginBottom:24,fontStyle:'italic'}}>For the next moment, look only at the glass.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',alignItems:'center',marginBottom:12}}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={sensory} onChange={toggleSensory} /> Enable sensory effects
          </label>
        </div>
        {sensory && (
          <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'center',marginBottom:12}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <button className="btn small" onClick={()=>amb.toggle()}>{amb.on ? 'Mute' : 'Unmute'}</button>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <label style={{fontSize:12}}>Intensity</label>
                <input type="range" min={0} max={100} value={amb.level} onChange={e=>amb.setLevel(Number(e.target.value))} />
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <label style={{fontSize:12}}>Beat Hz</label>
                <input type="range" min={1} max={12} value={amb.beat} onChange={e=>amb.setBeat(Number(e.target.value))} />
              </div>
            </div>
          </div>
        )}
        <button className="btn" onClick={begin}>Begin</button>
      </div>
    </div>
  )
}
