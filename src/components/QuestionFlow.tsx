import React, {useEffect, useState} from 'react'
import { useSensory } from '../context/SensoryContext'
import questions from '../data/questions_full.json'
import Auth from './Auth'
import { calculateScores, determinePrimaries } from '../lib/scoring'
import { generateSigilSVG } from '../lib/sigil'
import DarkEntry from './DarkEntry'
import Calibration from './Calibration'

type Q = typeof questions[0]

export default function QuestionFlow(){
  const amb = useSensory()
  const [user, setUser] = React.useState<any>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<any>>([])
  const [sessionId, setSessionId] = useState<string|null>(null)
  const [result, setResult] = useState<any|null>(null)
  const [phase, setPhase] = useState<'entry'|'calibration'|'questions'>('entry')
  const [theme, setTheme] = useState<any>(null)
  const [startTimes, setStartTimes] = useState<Record<string,string>>({})

  const current: Q = questions[index]

  function select(choiceId: string){
    const choice = current.responses.find((r:any)=>r.id===choiceId)
    if(!choice) return
    const started = startTimes[current.question_id]
    const submitted = new Date().toISOString()
    const latency = started ? (new Date(submitted).getTime() - new Date(started).getTime()) : undefined
    const answerObj:any = { questionId: current.question_id, selectedId: choiceId, weights: choice.weights, response_started_at: started || null, response_submitted_at: submitted, latency_ms: latency }
    const nextAnswers = [...answers, answerObj]
    setAnswers(nextAnswers)
    // persist session snapshot
    (async ()=>{
      try{
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session: { id: sessionId, userId: user?.id ?? null, current_index: index, answers: nextAnswers, updated_at: new Date().toISOString(), theme } })
        })
          .then(r=>r.json())
          .then(b=>{ if(b && b.id && !sessionId) setSessionId(b.id) })
      }catch(e){ /* ignore session save errors for prototype */ }
    })()
    const next = index+1
    if(next >= questions.length){
      // compute result
      const scores = calculateScores([...answers, answerObj])
      const prim = determinePrimaries(scores)
      // build a simple seed from primary ids
      const seed = [ (prim.primary_origin||'origin_unknown').replace('origin_',''), (prim.primary_archetype||'archetype_unknown').replace('archetype_',''), (prim.primary_affinity||'affinity_unknown').replace('affinity_',''), ( (prim.primary_teleos||'teleos_unknown').replace('teleos_','')) ].join('-')
      const svg = generateSigilSVG(seed)
      const mythos = { prim, seed, scores, svg }

      // persist result to serverless API (development placeholder)
      ;(async ()=>{
        try{
          // finalize session snapshot (mark completed)
          await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session: { id: sessionId, userId: user?.id ?? null, current_index: next, answers: [...answers, answerObj], completed_at: new Date().toISOString(), theme } })
          })
        }catch(e){ /* ignore */ }

        try{
          const resp = await fetch('/api/save-results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mythos })
          })
          const body = await resp.json()
          if(resp.ok && body.id){
            setResult({ prim, seed, svg, savedId: body.id })
          }else{
            setResult({ prim, seed, svg, saveError: body.error || 'save_failed' })
          }
        }catch(err:any){
          setResult({ prim, seed, svg, saveError: String(err) })
        }
      })()
    } else {
      // trigger a brief glitch animation after first answer
      if(index === 0){
        const el = document.querySelector('.card')
        if(el){ el.classList.add('glitch'); setTimeout(()=>el.classList.remove('glitch'),360) }
      }
      try{ if(amb.sensory) navigator.vibrate && navigator.vibrate(20) }catch(e){}
      setIndex(next)
    }
  }

  // resume previous session on load or create a new one
  useEffect(()=>{
    (async ()=>{
      try{
        // try to fetch existing sessions (dev endpoint returns all sessions)
        const getResp = await fetch('/api/session')
        if(getResp.ok){
          const body = await getResp.json()
          const sessions = Array.isArray(body.sessions) ? body.sessions : []
          // prefer a session matching current user and not completed; otherwise any incomplete session
          const candidate = sessions.reverse().find((rec:any)=>{
            const s = rec.session
            if(!s) return false
            if(user && s.userId && user.id && s.userId === user.id && !s.completed_at) return true
            if(!s.completed_at) return true
            return false
          })

          if(candidate){
            const s = candidate.session
            setSessionId(candidate.id)
            if(Array.isArray(s.answers) && s.answers.length){
              setAnswers(s.answers)
              const idx = typeof s.current_index === 'number' ? s.current_index : s.answers.length
              setIndex(idx)
              if(s.theme) setTheme(s.theme)
              setPhase('questions')
              return
            }
          }
        }

        // no resume candidate — create a fresh session
        const resp = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session: { userId: user?.id ?? null, started_at: new Date().toISOString(), current_index: 0, answers: [] } })
        })
        const created = await resp.json()
        if(resp.ok && created.id) setSessionId(created.id)
      }catch(e){ /* ignore session creation errors for prototype */ }
    })()
  // run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // set question start timestamp when index changes
  useEffect(()=>{
    if(phase !== 'questions') return
    const q = questions[index]
    if(!q) return
    setStartTimes(prev=>({ ...prev, [q.question_id]: new Date().toISOString() }))
  },[index, phase])

  if(phase === 'entry') return <DarkEntry onBegin={()=>setPhase('calibration')} />

  if(phase === 'calibration') return (
    <div>
      <Auth onAuth={(u)=>setUser(u)} />
      <Calibration onDone={async (t)=>{
        setTheme(t)
        // persist theme to session
        try{ await fetch('/api/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: { id: sessionId, userId: user?.id ?? null, theme: t, updated_at: new Date().toISOString() } }) }) }catch(e){}
        setPhase('questions')
      }} />
    </div>
  )

  if(result) return (
    <div className="card result">
      <h2>Your Mythos</h2>
      <p><strong>{result.prim.primary_archetype}</strong> · <em>{result.prim.primary_origin}</em> · {result.prim.primary_affinity}</p>
      <div style={{marginBottom:8}}>Signed in as: {user?.email ?? user?.name ?? 'Guest'}</div>
      <div dangerouslySetInnerHTML={{__html: result.svg}} />
      <pre style={{whiteSpace:'pre-wrap',color:'#cbd5e1'}}>{JSON.stringify(result.prim.scores,null,2)}</pre>
      {result.savedId && <div style={{marginTop:8,color:'#9ae6b4'}}>Saved: {result.savedId}</div>}
      {result.saveError && <div style={{marginTop:8,color:'#fca5a5'}}>Save error: {result.saveError}</div>}
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
