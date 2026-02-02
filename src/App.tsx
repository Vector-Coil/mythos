import React from 'react'
import QuestionFlow from './components/QuestionFlow'
import AmbientControl from './components/AmbientControl'
import AmbientIndicator from './components/AmbientIndicator'
import { SensoryProvider } from './context/SensoryContext'

export default function App() {
  return (
    <SensoryProvider>
    <div className="app">
      <header className="header">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <h1 style={{margin:0}}>Axiom — Prototype</h1>
          <AmbientControl />
        </div>
      </header>
      <main>
        <QuestionFlow />
      </main>
      <footer style={{position:'fixed',left:12,right:12,bottom:12,display:'flex',justifyContent:'center'}}>
        <AmbientIndicator />
      </footer>
    </div>
    </SensoryProvider>
  )
}
