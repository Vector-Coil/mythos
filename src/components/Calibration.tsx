import React, { useState } from 'react'
import { useSensory } from '../context/SensoryContext'

const CAL_QUESTIONS = [
  { id: 'sound', text: 'Which sound completes the room?', options: ['Fire','Water','Silence','Echoes'] },
  { id: 'texture', text: 'Choose a texture:', options: ['Marble','Bark','Silk','Iron'] },
  { id: 'mood', text: 'Choose a mood:', options: ['Warm','Cool','Still','Volatile'] }
]

export default function Calibration({ onDone }:{ onDone:(theme:any)=>void }){
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const amb = useSensory()

  function choose(opt:string){
    const q = CAL_QUESTIONS[i]
    const next = {...answers, [q.id]: opt}
    setAnswers(next)
    try{ if(amb.sensory) navigator.vibrate && navigator.vibrate(25) }catch(e){}
    // user gesture - ensure ambient audio is allowed if sensory enabled
    try{ if(amb.sensory && !amb.on) amb.toggle() }catch(e){}
    if(i+1 >= CAL_QUESTIONS.length){
      onDone(next)
    }else{
      setI(i+1)
    }
  }

  const q = CAL_QUESTIONS[i]
  return (
    <div className="card">
      <h3>{q.text}</h3>
      <div className="answers" style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {q.options.map(o=> <button key={o} className="btn" onClick={()=>choose(o)}>{o}</button>)}
      </div>
      <div style={{marginTop:12}}><small>Calibration {i+1} of {CAL_QUESTIONS.length}</small></div>
    </div>
  )
}
