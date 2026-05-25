import { useEffect, useState } from 'react'
import PhaseActivate from './components/PhaseActivate.jsx'
import PhaseReveal from './components/PhaseReveal.jsx'
import PhaseMessage from './components/PhaseMessage.jsx'

export default function App() {
  const [phase, setPhase] = useState(1)
  const [fade, setFade] = useState(false)

  const goReveal  = () => setPhase(2)
  const goMessage = () => setPhase(3)

  const resetAll = () => {
    setFade(true)
    setTimeout(() => {
      setPhase(1)
      setTimeout(() => setFade(false), 60)
    }, 900)
  }

  useEffect(() => {
    const el = document.getElementById('fade')
    if (!el) return
    el.classList.toggle('active', fade)
  }, [fade])

  return (
    <div className="parchment-stage">
      {phase === 1 && <PhaseActivate onUnlock={goReveal} />}
      {phase === 2 && <PhaseReveal   onMeet={goMessage} />}
      {phase === 3 && <PhaseMessage  onReset={resetAll} />}
    </div>
  )
}
