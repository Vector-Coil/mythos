import React, {useEffect, useState} from 'react'
import { useSensory } from '../context/SensoryContext'
import questions from '../data/questions_full.json'
import Auth from './Auth'
import { calculateScores, determinePrimaries } from '../lib/scoring'
import { generateSigilSVG } from '../lib/sigil'
import DarkEntry from './DarkEntry'
import Calibration from './Calibration'

// Small helpers for rendering human-friendly labels
function humanLabel(key?: string){
  if(!key) return 'Unknown'
  const map: Record<string,string> = {
    // origins
    origin_order: 'The Eternal Order',
    origin_wild: 'The Fecund Wild',
    origin_spark: 'The Celestial Spark',
    origin_void: 'The Primordial Void',
    origin_ancestry: 'The Great Ancestry',
    // archetypes
    archetype_sovereign: 'Sovereign',
    archetype_iconoclast: 'Iconoclast',
    archetype_alchemist: 'Alchemist',
    archetype_sentinel: 'Sentinel',
    archetype_wayfarer: 'Wayfarer',
    archetype_weaver: 'Weaver',
    // affinities
    affinity_solar: 'Solar',
    affinity_lunar: 'Lunar',
    affinity_stellar: 'Stellar',
    affinity_volcanic: 'Volcanic',
    // teleos
    teleos_apotheosis: 'Apotheosis',
    teleos_communion: 'Communion',
    teleos_legacy: 'Legacy',
    teleos_equilibrium: 'Equilibrium',
    teleos_transcendence: 'Transcendence'
  }
  return map[key] || key.replace(/^.*?_/, '').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
}

function ResultTitle({prim}:{prim:any}){
  const arche = humanLabel(prim.primary_archetype)
  const origin = humanLabel(prim.primary_origin)
  const affinity = humanLabel(prim.primary_affinity)
  return <p style={{fontSize:16,marginTop:6}}><strong>{affinity} {arche}</strong> · <em>{origin}</em></p>
}

function ScoreList({scores}:{scores:Record<string,number>}){
  if(!scores) return null
  const items = Object.entries(scores).sort((a,b)=>b[1]-a[1])
  return (
    <div style={{maxHeight:220,overflow:'auto',background:'rgba(255,255,255,0.02)',padding:8,borderRadius:8}}>
      {items.map(([k,v])=> (
        <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 8px',borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
          <div style={{color:'#e2e8f0'}}>{humanLabel(k)}</div>
          <div style={{color:'#9ca3af'}}>{Math.round(v)}</div>
        </div>
      ))}
    </div>
  )
}

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
  const [savedIdInput, setSavedIdInput] = useState<string>('')
  const [recentResults, setRecentResults] = useState<any[]|null>(null)
  const [loadingRecent, setLoadingRecent] = useState(false)

  const current: Q = questions[index]

  const handleSelect = (choiceId: string) => {
    const choice = current.responses.find((r:any)=>r.id===choiceId)
    if(!choice) return
    const started = startTimes[current.question_id]
    const submitted = new Date().toISOString()
    const latency = started ? (new Date(submitted).getTime() - new Date(started).getTime()) : undefined
    const answerObj:any = { questionId: current.question_id, selectedId: choiceId, weights: choice.weights, response_started_at: started || null, response_submitted_at: submitted, latency_ms: latency }
    const nextAnswers = [...answers, answerObj]
    setAnswers(nextAnswers);
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

      // persist completed result locally so a page refresh will still show it
      try{ localStorage.setItem('mythos_result', JSON.stringify(mythos)) }catch(e){}

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
            const r = { prim, seed, svg, savedId: body.id }
            try{ localStorage.setItem('mythos_result', JSON.stringify(r)) }catch(e){}
            setResult(r)
          }else{
            const r = { prim, seed, svg, saveError: body.error || 'save_failed' }
            try{ localStorage.setItem('mythos_result', JSON.stringify(r)) }catch(e){}
            setResult(r)
          }
        }catch(err:any){
          const r = { prim, seed, svg, saveError: String(err) }
          try{ localStorage.setItem('mythos_result', JSON.stringify(r)) }catch(e){}
          setResult(r)
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
    // if a completed result exists locally, load it so refresh shows the results view
    try{
      const stored = localStorage.getItem('mythos_result')
      if(stored){
        const parsed = JSON.parse(stored)
        if(parsed && parsed.prim){
          setResult(parsed)
          return
        }
      }
    }catch(e){}

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
      <div style={{marginBottom:8}}>Signed in as: {user?.email ?? user?.name ?? 'Guest'}</div>

      {/* Human-friendly title */}
      <ResultTitle prim={result.prim} />

      <div style={{marginTop:12,marginBottom:12}} dangerouslySetInnerHTML={{__html: result.svg}} />

      <div style={{marginTop:8}}>
        <h4 style={{margin: '6px 0'}}>Scores</h4>
        <ScoreList scores={result.prim.scores} />
      </div>

      {result.savedId && <div style={{marginTop:8,color:'#9ae6b4'}}>Saved: {result.savedId}</div>}
      {result.saveError && <div style={{marginTop:8,color:'#fca5a5'}}>Save error: {result.saveError}</div>}
      <button className="btn" onClick={()=>{setIndex(0); setAnswers([]); setResult(null); try{ localStorage.removeItem('mythos_result') }catch(e){} }}>Retake</button>
    </div>
  )

  return (
    <div>
      <Auth onAuth={(u)=>setUser(u)} />
      <div style={{margin:'10px 0'}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Enter result id to load" value={savedIdInput} onChange={(e)=>setSavedIdInput(e.target.value)} style={{flex:1}} />
          <button className="btn" onClick={async ()=>{
            if(!savedIdInput) return
            try{
              const resp = await fetch('/api/save-results?id='+encodeURIComponent(savedIdInput))
              if(!resp.ok) return
              const body = await resp.json()
              if(body && body.mythos){
                try{ localStorage.setItem('mythos_result', JSON.stringify(body.mythos)) }catch(e){}
                setResult(body.mythos)
              }
            }catch(e){ }
          }}>Load</button>
          <button className="btn" onClick={async ()=>{
            setLoadingRecent(true); setRecentResults(null)
            try{
              const resp = await fetch('/api/save-results')
              const body = await resp.json()
              if(resp.ok && Array.isArray(body.results)) setRecentResults(body.results)
            }catch(e){}
            setLoadingRecent(false)
          }}>{loadingRecent ? 'Loading...' : 'Recent'}</button>
        </div>
        {recentResults && (
          <div style={{marginTop:8,maxHeight:160,overflow:'auto',border:'1px solid rgba(255,255,255,0.04)',borderRadius:6,padding:8}}>
            {recentResults.map(r=> (
              <div key={r.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 4px'}}>
                <div style={{flex:1}}>{r.seed || r.id}</div>
                <div style={{marginLeft:8}}><button className="btn" onClick={async ()=>{
                  try{
                    const resp = await fetch('/api/save-results?id='+encodeURIComponent(r.id))
                    const body = await resp.json()
                    if(resp.ok && body.mythos){ try{ localStorage.setItem('mythos_result', JSON.stringify(body.mythos)) }catch(e){}; setResult(body.mythos) }
                  }catch(e){}
                }}>View</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card">
      <div className="question">
        <h3>{current.text}</h3>
        <div className="answers">
          {current.responses.map((r:any)=> (
            <button key={r.id} className="btn" onClick={()=>handleSelect(r.id)}>{r.text}</button>
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
