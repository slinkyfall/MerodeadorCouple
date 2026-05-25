// SVG decorativo ligero: solo brújula, estrellas doradas y destellos.
// La ilustración pesada del mapa viene de la imagen PNG/JPG en la capa inferior.
export default function SparklesLayer() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none' }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path id="sp-banner" d="M 380 88 Q 500 56 620 88" fill="none" />
        <path id="sp-sub"    d="M 372 130 Q 500 116 628 130" fill="none" />
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <style>{`
        .sp { fill: none; stroke: #c8a24b; stroke-linecap: round; }
        .sp.thin  { stroke-width: 0.6; opacity: 0.55; }
        .sp.glow  { stroke-width: 0.9; opacity: 0.8; filter: url(#glow); }
        .spt { font-family: 'MedievalSharp', serif; fill: #1a0e06; opacity: 0.95; filter: drop-shadow(0 0 3px rgba(233,217,180,0.8)); }
        .spt-lg { font-size: 17px; letter-spacing: 2px; }
        .spt-sm { font-size: 10px; letter-spacing: 0.8px; font-style: italic; }
        .spt-xs { font-size: 8px; letter-spacing: 0.5px; font-style: italic; }

        .sp-fi { opacity: 0; animation: spFi 1400ms ease 2400ms forwards; }
        .sp-fi.d1 { animation-delay: 2400ms; }
        .sp-fi.d2 { animation-delay: 3000ms; }
        .sp-fi.d3 { animation-delay: 3600ms; }
        @keyframes spFi { to { opacity: 1; } }

        .sp-star { opacity: 0; animation: spStar 800ms ease var(--sd,2800ms) forwards; }
        @keyframes spStar { 0% { opacity:0; transform:scale(0); } 60% { opacity:1; transform:scale(1.4); } 100% { opacity:1; transform:scale(1); } }
      `}</style>

      {/* Líneas radiantes doradas finas desde el centro */}
      <g className="sp-fi d2">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
          const rad = a * Math.PI / 180
          return (
            <line key={'ray'+i}
              className="sp thin"
              x1={500 + 60 * Math.cos(rad)} y1={300 + 60 * Math.sin(rad)}
              x2={500 + 280 * Math.cos(rad)} y2={300 + 280 * Math.sin(rad)}
            />
          )
        })}
      </g>

      {/* Banner central + textos */}
      <g className="sp-fi d1">
        <path className="sp glow" d="M 350 75 Q 410 50 500 65 Q 590 50 650 75 Q 640 110 600 100 Q 500 92 400 100 Q 360 110 350 75 Z" />
        <path className="sp thin" d="M 370 75 Q 500 60 630 75" />
        <path className="sp thin" d="M 350 75 Q 332 80 322 100 Q 340 95 348 88" />
        <path className="sp thin" d="M 650 75 Q 668 80 678 100 Q 660 95 652 88" />
      </g>

      <text className="spt spt-lg sp-fi d1">
        <textPath href="#sp-banner" startOffset="50%" textAnchor="middle">
          Itinerarivm Marauderis
        </textPath>
      </text>
      <text className="spt spt-sm sp-fi d2">
        <textPath href="#sp-sub" startOffset="50%" textAnchor="middle">
          Messrs · Moony · Wormtail · Padfoot &amp; Prongs
        </textPath>
      </text>
      <text className="spt spt-xs sp-fi d2" x="500" y="155" textAnchor="middle">
        are proud to present
      </text>

      {/* Brújula dorada */}
      <g className="sp-fi d3" transform="translate(110 520)">
        <circle className="sp glow" cx="0" cy="0" r="22" />
        <circle className="sp thin" cx="0" cy="0" r="14" />
        <path className="sp glow" d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" />
        <path className="sp glow" d="M -22 0 L 0 4 L 22 0 L 0 -4 Z" />
        <path className="sp thin" d="M 0 -22 L 2.5 -8 L 0 0 L -2.5 -8 Z" style={{ fill: '#f4d384', stroke: 'none', opacity: 0.9 }} />
        <text className="spt" style={{ fontFamily: 'MedievalSharp,serif', fontSize: '9px', fill: '#c8a24b', opacity: 0.9 }} x="0" y="-26" textAnchor="middle">N</text>
        <text className="spt" style={{ fontFamily: 'MedievalSharp,serif', fontSize: '9px', fill: '#c8a24b', opacity: 0.9 }} x="0" y="33"  textAnchor="middle">S</text>
        <text className="spt" style={{ fontFamily: 'MedievalSharp,serif', fontSize: '9px', fill: '#c8a24b', opacity: 0.9 }} x="-28" y="3"  textAnchor="middle">W</text>
        <text className="spt" style={{ fontFamily: 'MedievalSharp,serif', fontSize: '9px', fill: '#c8a24b', opacity: 0.9 }} x="28"  y="3"  textAnchor="middle">E</text>
      </g>

      {/* Estrellas doradas animadas */}
      {[
        [315, 190, '2600ms'], [625, 205, '2800ms'], [335, 360, '3000ms'],
        [615, 390, '2700ms'], [75, 90, '3200ms'],   [940, 440, '2900ms'],
        [200, 140, '3400ms'], [820, 500, '3100ms'],
      ].map(([x, y, sd], i) => (
        <g key={'star'+i} className="sp-star" style={{ '--sd': sd, transformOrigin: `${x}px ${y}px` }}
           transform={`translate(${x} ${y})`}>
          <path style={{ fill: '#f4d384', opacity: 0.9 }}
                d="M 0 -6 L 1.4 -1.4 L 6 0 L 1.4 1.4 L 0 6 L -1.4 1.4 L -6 0 L -1.4 -1.4 Z" />
        </g>
      ))}

      {/* Texto lateral OMNIBVS */}
      <text className="spt sp-fi d3" style={{ fontSize: '7px', letterSpacing: '3px', fill: '#4a3320', opacity: 0.65 }}
            x="500" y="14" textAnchor="middle">
        OMNIBVS · MARAVDENTIBVS · BONVM · AVDERE · EST
      </text>

      {/* Numeración grimorio */}
      <g className="sp-fi d3" style={{ opacity: 0.5 }}>
        <text className="spt" style={{ fontSize: '8px' }} x="30"  y="22">cclix</text>
        <text className="spt" style={{ fontSize: '8px' }} x="970" y="22" textAnchor="end">cclx</text>
        <text className="spt" style={{ fontSize: '8px' }} x="30"  y="588">clxv</text>
        <text className="spt" style={{ fontSize: '8px' }} x="970" y="588" textAnchor="end">clxvi</text>
      </g>
    </svg>
  )
}
