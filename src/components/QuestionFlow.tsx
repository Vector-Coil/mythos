import React, {useEffect, useState} from 'react'
import questions from '../data/questions_full.json'
import Auth from './Auth'
import { calculateScores, determinePrimaries } from '../lib/scoring'
import { generateSigilSVG } from '../lib/sigil'

type Q = typeof questions[0]

export default function QuestionFlow(){
  const [user, setUser] = React.useState<any>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<{questionId:string; selectedId:string; weights:any}>>([])
  const [result, setResult] = useState<any|null>(null)

  const current: Q = questions[index]

  function select(choiceId: string){
    const choice = current.responses.find((r:any)=>r.id===choiceId)
    if(!choice) return
    setAnswers(prev=>[...prev,{questionId: current.question_id, selectedId: choiceId, weights: choice.weights}])
    const next = index+1
    if(next >= questions.length){
      // compute result
      const scores = calculateScores([...answers,{questionId: current.question_id, selectedId: choiceId, weights: choice.weights}])
      const prim = determinePrimaries(scores)
      // build a simple seed from primary ids
      const seed = [ (prim.primary_origin||'origin_unknown').replace('origin_',''), (prim.primary_archetype||'archetype_unknown').replace('archetype_',''), (prim.primary_affinity||'affinity_unknown').replace('affinity_',''), ( (prim.primary_teleos||'teleos_unknown').replace('teleos_','')) ].join('-')
      setResult({prim, seed, svg: generateSigilSVG(seed)})
    } else {
      setIndex(next)
    }
  }

  if(result) return (
    <div className="card result">
      <h2>Your Mythos</h2>
      <p><strong>{result.prim.primary_archetype}</strong> · <em>{result.prim.primary_origin}</em> · {result.prim.primary_affinity}</p>
      <div style={{marginBottom:8}}>Signed in as: {user?.email ?? user?.name ?? 'Guest'}</div>
      <div dangerouslySetInnerHTML={{__html: result.svg}} />
      <pre style={{whiteSpace:'pre-wrap',color:'#cbd5e1'}}>{JSON.stringify(result.prim.scores,null,2)}</pre>
      <button className="btn" onClick={()=>{setIndex(0); setAnswers([]); setResult(null)}}>Retake</button>
    </div>
  )

  return (
    <div>
      <Auth onAuth={(u)=>setUser(u)} />
      <div className="card">
      <div className="question">
        <h3>{current.text}</h3>
        <div className="answers">
          {current.responses.map((r:any)=> (
            <button key={r.id} className="btn" onClick={()=>select(r.id)}>{r.text}</button>
          ))}
        </div>
      </div>
      <div style={{marginTop:12}}>
        <small>Question {index+1} of {questions.length}</small>
      </div>
      </div>
    </div>
  )
}
