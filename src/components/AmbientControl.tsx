import React from 'react'
import { useSensory } from '../context/SensoryContext'

export default function AmbientControl(){
  const amb = useSensory()

  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      <button className="btn small" onClick={amb.toggle}>{amb.on ? 'Ambient On' : 'Ambient Off'}</button>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <label style={{fontSize:12}}>Intensity</label>
        <input type="range" min={0} max={100} value={amb.level} onChange={e=>amb.setLevel(Number(e.target.value))} />
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <label style={{fontSize:12}}>Beat</label>
        <input type="range" min={1} max={12} value={amb.beat} onChange={e=>amb.setBeat(Number(e.target.value))} />
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <label style={{fontSize:12}}>Timbre</label>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button className="btn tiny" onClick={()=>amb.setBase(110)}>Deep</button>
          <button className="btn tiny" onClick={()=>amb.setBase(240)}>Warm</button>
          <button className="btn tiny" onClick={()=>amb.setBase(440)}>Bright</button>
        </div>
      </div>
    </div>
  )
}
