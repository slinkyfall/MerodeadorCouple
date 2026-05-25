import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  if (!audioRef.current) {
    const a = new Audio('/assets/musica.mp3')
    a.loop = true
    a.volume = 0.55
    audioRef.current = a
  }

  useEffect(() => {
    const a = audioRef.current
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    return () => { a.pause() }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <div className={'audio-player' + (playing ? ' playing' : '')} style={{ pointerEvents: 'auto' }}>
      <div className="equalizer" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="meta">
        <div className="label">Sonando</div>
        <div className="track">Hedwig's Theme</div>
      </div>
      <button className="lumos-btn" onClick={toggle} aria-label={playing ? 'Pausar (Nox)' : 'Reproducir (Lumos)'}>
        {playing ? 'Nox' : 'Lumos'}
      </button>
    </div>
  )
}
