import { useEffect, useMemo, useState } from 'react'
import SparklesLayer from './SparklesLayer.jsx'
import FootprintSVG from './FootprintSVG.jsx'
import AudioPlayer from './AudioPlayer.jsx'
import { NAME_LEFT, NAME_RIGHT } from '../config.js'

export default function PhaseReveal({ onMeet }) {
  const leftSteps = useMemo(() => [
    { x: 8,  y: 78, side: 'left',  rot: 18,  delay: 0 },
    { x: 14, y: 72, side: 'right', rot: 22,  delay: 280 },
    { x: 20, y: 66, side: 'left',  rot: 25,  delay: 560 },
    { x: 26, y: 60, side: 'right', rot: 28,  delay: 840 },
    { x: 32, y: 56, side: 'left',  rot: 32,  delay: 1120 },
    { x: 38, y: 52, side: 'right', rot: 38,  delay: 1400 },
    { x: 43, y: 50, side: 'left',  rot: 45,  delay: 1680 },
    { x: 47, y: 49, side: 'right', rot: 60,  delay: 1960 },
  ], [])

  const rightSteps = useMemo(() => [
    { x: 92, y: 22, side: 'right', rot: -18, delay: 0 },
    { x: 86, y: 28, side: 'left',  rot: -22, delay: 280 },
    { x: 80, y: 34, side: 'right', rot: -25, delay: 560 },
    { x: 74, y: 40, side: 'left',  rot: -28, delay: 840 },
    { x: 68, y: 44, side: 'right', rot: -32, delay: 1120 },
    { x: 62, y: 47, side: 'left',  rot: -38, delay: 1400 },
    { x: 57, y: 48, side: 'right', rot: -45, delay: 1680 },
    { x: 53, y: 49, side: 'left',  rot: -60, delay: 1960 },
  ], [])

  const renderStep = (s, i, total, keyPrefix) => {
    const isLast = i === total - 1
    return (
      <div
        key={keyPrefix + i}
        className={'footprint ' + (isLast ? 'land' : 'walk')}
        style={{
          left: s.x + '%',
          top:  s.y + '%',
          animationDelay: s.delay + 'ms',
          '--rot': s.rot + 'deg',
          transform: `rotate(${s.rot}deg)`,
        }}
      >
        <FootprintSVG side={s.side} />
      </div>
    )
  }

  const [meetingReady, setMeetingReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMeetingReady(true), 4800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="phase entered reveal-stage">

      {/* ── CAPA z-10: Ilustración del mapa real ─────────────────────
          Agrega 'public/assets/mapa-fondo.jpg' con la imagen del mapa.
          mix-blend-mode:multiply la fusiona con el pergamino.
          Si el archivo no existe, se muestra solo el pergamino base.
      ──────────────────────────────────────────────────────────── */}
      <div className="map-illustration-layer">
        <img
          src="/assets/mapa-fondo.jpg"
          alt=""
          className="map-full-image"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* ── CAPA z-20: Destellos y decoraciones SVG doradas ────────── */}
      <SparklesLayer />

      {/* ── CAPA z-30: Huellas animadas Kevin ───────────────────────── */}
      <div className="footprint-trail" style={{ zIndex: 30 }}>
        {leftSteps.map((s, i) => renderStep(s, i, leftSteps.length, 'L'))}
        <div className="trail-name" style={{
          left: (leftSteps[leftSteps.length - 1].x - 6) + '%',
          top:  (leftSteps[leftSteps.length - 1].y - 4) + '%',
          animationDelay: '2400ms',
          zIndex: 30,
        }}>{NAME_LEFT}</div>
      </div>

      {/* ── CAPA z-30: Huellas animadas Anabella ───────────────────── */}
      <div className="footprint-trail" style={{ zIndex: 30 }}>
        {rightSteps.map((s, i) => renderStep(s, i, rightSteps.length, 'R'))}
        <div className="trail-name" style={{
          left: (rightSteps[rightSteps.length - 1].x + 3) + '%',
          top:  (rightSteps[rightSteps.length - 1].y - 4) + '%',
          animationDelay: '2400ms',
          zIndex: 30,
        }}>{NAME_RIGHT}</div>
      </div>

      {/* ── CAPA z-40: Punto de encuentro ───────────────────────────── */}
      {meetingReady && (
        <div
          className="meeting-point"
          onClick={onMeet}
          style={{ pointerEvents: 'auto', zIndex: 40 }}
          role="button"
          aria-label="Abrir el mensaje"
        >
          <div className="meeting-point-inner" />
          <div className="meeting-cta magic-font">Toca para abrir</div>
        </div>
      )}

      {/* ── CAPA z-40: Reproductor de audio ─────────────────────────── */}
      <AudioPlayer />

    </div>
  )
}
