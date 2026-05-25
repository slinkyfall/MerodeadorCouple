import { useState, useEffect, useRef } from 'react'
import { SPELL, normalize } from '../config.js'

export default function PhaseActivate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const tryUnlock = () => {
    if (normalize(value) === normalize(SPELL)) {
      onUnlock()
    } else {
      setWrong(true)
      setTimeout(() => setWrong(false), 450)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') tryUnlock()
  }

  return (
    <div className="phase entered">
      <div className="phase-1-quill">⸻  Pergamino sin firma  ⸻</div>
      <h1 className="phase-1-title">Mapa del Merodeador</h1>
      <p className="phase-1-sub">
        Este pergamino parece estar en blanco. Quien quiera revelar sus secretos
        debe pronunciar el juramento correcto.
      </p>

      <div className="spell-input-wrap">
        <input
          ref={inputRef}
          className={'spell-input' + (wrong ? ' wrong' : '')}
          type="text"
          placeholder="Escribe el hechizo para revelar el mapa…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="wax-seal"
          onClick={tryUnlock}
          aria-label="Sellar y revelar"
          title="Sellar"
        >
          {/* Sello de lacre medieval — estrella gótica de 4 puntas + anillos */}
          <svg viewBox="-34 -34 68 68" width="46" height="46" style={{ display: 'block', pointerEvents: 'none' }}>
            {/* Anillo exterior dentado */}
            <circle r="30" fill="none" stroke="rgba(244,211,132,0.28)" strokeWidth="1.4" strokeDasharray="4.5 2.5" />
            {/* Anillo interior */}
            <circle r="22" fill="none" stroke="rgba(244,211,132,0.2)" strokeWidth="0.8" />
            {/* Estrella gótica de 4 puntas — forma principal */}
            <path
              d="M 0 -20 L 4.5 -4.5 L 20 0 L 4.5 4.5 L 0 20 L -4.5 4.5 L -20 0 L -4.5 -4.5 Z"
              fill="#f4d384" opacity="0.95"
            />
            {/* Rombo intermedio — profundidad */}
            <path
              d="M 0 -9 L 9 0 L 0 9 L -9 0 Z"
              fill="#c8a24b" opacity="0.8"
            />
            {/* Punto central */}
            <circle r="3" fill="#f4d384" opacity="0.98" />
            {/* Rombos decorativos en los 4 ejes cardinales del anillo */}
            <path d="M 0 -27 L 2 -24.5 L 0 -22 L -2 -24.5 Z" fill="rgba(244,211,132,0.65)" />
            <path d="M 27 0 L 24.5 2 L 22 0 L 24.5 -2 Z" fill="rgba(244,211,132,0.65)" />
            <path d="M 0 27 L 2 24.5 L 0 22 L -2 24.5 Z" fill="rgba(244,211,132,0.65)" />
            <path d="M -27 0 L -24.5 2 L -22 0 L -24.5 -2 Z" fill="rgba(244,211,132,0.65)" />
            {/* Pequeños puntos en las diagonales del anillo */}
            <circle r="1.4" cx="20"  cy="-20" fill="rgba(244,211,132,0.38)" />
            <circle r="1.4" cx="20"  cy="20"  fill="rgba(244,211,132,0.38)" />
            <circle r="1.4" cx="-20" cy="20"  fill="rgba(244,211,132,0.38)" />
            <circle r="1.4" cx="-20" cy="-20" fill="rgba(244,211,132,0.38)" />
          </svg>
        </button>
      </div>

      <div className="phase-1-hint">— pista: lo dijo Harry para activarlo —</div>
    </div>
  )
}
