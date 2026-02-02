import React from 'react'
import { useSensory } from '../context/SensoryContext'

export default function AmbientIndicator(){
  const amb = useSensory()
  return (
    <div style={{padding:8,fontSize:12,textAlign:'center',opacity:0.95}}>
      Ambient: {amb.on ? <span className="ambient-pulse">On</span> : <strong style={{color:'#888'}}>Off</strong>}
    </div>
  )
}
