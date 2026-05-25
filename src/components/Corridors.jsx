export default function Corridors() {
  const TX = 160, TY = 260
  const RADII = [50, 85, 120, 155, 190, 225, 260]
  const RADIAL_ANGLES = [105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255]

  const pt = (cx, cy, r, deg) => {
    const a = deg * Math.PI / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const halfArc = (cx, cy, r) =>
    `M ${cx} ${cy + r} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`

  return (
    <svg className="corridors" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="hatching" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#4a3320" strokeWidth="0.4" opacity="0.25" />
        </pattern>
        <pattern id="hatching-dense" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="3" stroke="#3a2810" strokeWidth="0.4" opacity="0.3" />
        </pattern>
        <pattern id="hatching-h" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="2" x2="4" y2="2" stroke="#4a3320" strokeWidth="0.35" opacity="0.28" />
        </pattern>

        <path id="tp-tower-outer" d="M -70 300 A 230 230 0 0 1 160 70" fill="none" />
        <path id="tp-defense"     d="M 5 300 A 155 155 0 0 1 160 145" fill="none" />
        <path id="tp-banner"      d="M 380 88 Q 500 56 620 88" fill="none" />
        <path id="tp-presenters"  d="M 372 130 Q 500 116 628 130" fill="none" />
        <path id="tp-lower"       d="M 360 555 Q 500 575 640 555" fill="none" />
        <path id="tp-east-arc"    d="M 700 360 A 140 140 0 0 1 840 220" fill="none" />
        <path id="tp-range"       d="M 300 420 Q 360 360 410 280" fill="none" />
      </defs>

      <style>{`
        .cl { fill: none; stroke: #3a2810; stroke-width: 0.9; opacity: 0.75; stroke-linecap: round; stroke-linejoin: round; }
        .cl.thin { stroke-width: 0.55; opacity: 0.55; }
        .cl.fine { stroke-width: 0.35; opacity: 0.45; }
        .cl.bold { stroke-width: 1.5; opacity: 0.85; }
        .cl.gold { stroke: #b88a3a; opacity: 0.65; }

        .mt { font-family: 'IM Fell English', 'MedievalSharp', serif; fill: #2b1d10; opacity: 0.78; }
        .mt.medieval { font-family: 'MedievalSharp', serif; }
        .mt-xs { font-size: 8px; letter-spacing: 0.5px; }
        .mt-sm { font-size: 10px; letter-spacing: 0.8px; }
        .mt-md { font-size: 12.5px; letter-spacing: 1.5px; }
        .mt-lg { font-size: 17px; letter-spacing: 2px; }
        .mt-italic { font-style: italic; }
        .mt-cap { text-transform: uppercase; letter-spacing: 1.8px; }

        .draw { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: drSvg 2400ms ease-out forwards; }
        .draw.d1 { animation-delay: 100ms; }
        .draw.d2 { animation-delay: 350ms; }
        .draw.d3 { animation-delay: 600ms; }
        @keyframes drSvg { to { stroke-dashoffset: 0; } }

        .fi { opacity: 0; animation: fiSvg 1500ms ease 1200ms forwards; }
        .fi.d1 { animation-delay: 1500ms; }
        .fi.d2 { animation-delay: 2000ms; }
        .fi.d3 { animation-delay: 2600ms; }
        @keyframes fiSvg { to { opacity: 1; } }

        .hatch { opacity: 0; animation: hSvg 2000ms ease 1800ms forwards; }
        @keyframes hSvg { to { opacity: 1; } }
      `}</style>

      {/* Texturas de fondo */}
      <g className="hatch">
        <path d="M 680 140 L 760 100 L 950 140 L 920 370 L 780 430 L 670 340 Z" fill="url(#hatching)" stroke="none" />
        <circle cx="840" cy="220" r="110" fill="url(#hatching-dense)" opacity="0.4" />
        <path d={`${halfArc(TX, TY, 225)} L ${TX} ${TY - 190} A 190 190 0 0 0 ${TX} ${TY + 190} Z`}
              fill="url(#hatching)" stroke="none" />
      </g>

      {/* ============================================================
          ALA IZQUIERDA — Torre Circular (Hogwart Tvrris Magnvs)
          ============================================================ */}
      {RADII.map((r, i) => (
        <path key={'arc' + i}
              className={'cl ' + (i % 2 === 0 ? 'bold' : 'thin') + ' draw d' + ((i % 3) + 1)}
              d={halfArc(TX, TY, r)} />
      ))}

      {RADIAL_ANGLES.map((a, i) => {
        const [x1, y1] = pt(TX, TY, RADII[0], a)
        const [x2, y2] = pt(TX, TY, RADII[RADII.length - 1] + 8, a)
        return <line key={'rad' + i} className="cl thin draw d1" x1={x1} y1={y1} x2={x2} y2={y2} />
      })}

      {/* Mini-habitaciones irregulares */}
      <g className="fi d1">
        {[115, 135, 155, 195, 215, 235].map((a, i) => {
          const [px, py] = pt(TX, TY, 260, a)
          const [qx, qy] = pt(TX, TY, 282, a)
          return (
            <g key={'room' + i}>
              <line className="cl fine" x1={px} y1={py} x2={qx} y2={qy} />
              <path className="cl thin"
                    d={`M ${qx-8} ${qy-6} L ${qx+8} ${qy-6} L ${qx+4} ${qy+6} L ${qx-4} ${qy+6} Z`}
                    transform={`rotate(${a - 90} ${qx} ${qy})`} />
            </g>
          )
        })}
      </g>

      {/* Escalera de caracol central */}
      <g className="fi d1">
        <circle className="cl" cx={TX} cy={TY} r="20" />
        <circle className="cl fine" cx={TX} cy={TY} r="10" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
          const [x1, y1] = pt(TX, TY, 4, a)
          const [x2, y2] = pt(TX, TY, 19, a)
          return <line key={'st' + i} className="cl fine" x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>

      <text className="mt medieval mt-md mt-cap fi d1">
        <textPath href="#tp-tower-outer" startOffset="50%" textAnchor="middle">
          Hogwart · Tvrris · Magnvs
        </textPath>
      </text>
      <text className="mt mt-sm mt-italic fi d2">
        <textPath href="#tp-defense" startOffset="50%" textAnchor="middle">
          Defense Corridor &nbsp;·&nbsp; Serpentine Hall
        </textPath>
      </text>

      {/* Etiquetas flotantes torre izquierda */}
      <g className="fi d1">
        <text className="mt mt-xs mt-italic" x="12" y="325">Keep an eye out for Ghosts</text>
        <text className="mt mt-xs mt-italic" x="22" y="420">Charms Classroom</text>
        <text className="mt mt-xs mt-italic" x="42" y="385">Peeves may lurk here</text>
        <text className="mt mt-xs mt-italic" x="85" y="475" transform="rotate(8 85 475)">Way to Transfiguration</text>
        <text className="mt mt-xs mt-italic" x="60" y="160" transform="rotate(-22 60 160)">Lost Wands</text>
      </g>
      <text className="mt mt-xs mt-italic fi d2">
        <textPath href="#tp-range" startOffset="50%" textAnchor="middle">Range to · · ·</textPath>
      </text>

      {/* ============================================================
          CENTRO — Banner, Castillo y Sauce
          ============================================================ */}
      <g className="fi d1">
        <path className="cl" d="M 350 75 Q 410 50 500 65 Q 590 50 650 75 Q 640 110 600 100 Q 500 92 400 100 Q 360 110 350 75 Z" />
        <path className="cl fine" d="M 370 75 Q 500 60 630 75" />
        <path className="cl fine" d="M 350 75 Q 332 80 322 100 Q 340 95 348 88" />
        <path className="cl fine" d="M 650 75 Q 668 80 678 100 Q 660 95 652 88" />
      </g>

      <text className="mt medieval mt-lg fi d1">
        <textPath href="#tp-banner" startOffset="50%" textAnchor="middle">
          Itinerarivm Marauderis
        </textPath>
      </text>
      <text className="mt mt-sm mt-italic fi d2">
        <textPath href="#tp-presenters" startOffset="50%" textAnchor="middle">
          Messrs · Moony · Wormtail · Padfoot &amp; Prongs
        </textPath>
      </text>
      <text className="mt mt-xs mt-italic fi d2" x="500" y="155" textAnchor="middle">
        are proud to present
      </text>

      {/* Castillo refinado */}
      <g className="fi d2">
        <path className="cl" d="M 465 248 L 465 185 L 472 185 L 472 178 L 485 178 L 485 185 L 498 185 L 498 248" />
        <path className="cl fine" d="M 470 178 L 478 162 L 483 178" />
        <path className="cl thin" d="M 440 248 L 440 205 L 452 205 L 452 212 L 465 212 L 465 248" />
        <path className="cl thin" d="M 498 248 L 498 212 L 512 212 L 512 205 L 530 205 L 530 248" />
        <path className="cl bold" d="M 488 180 L 488 148 L 484 148 L 493 134 L 502 148 L 498 148 L 498 180" />
        <line x1="446" y1="215" x2="446" y2="240" className="cl fine" />
        <line x1="522" y1="215" x2="522" y2="240" className="cl fine" />
        <path className="cl fine" d="M 475 248 L 475 224 Q 481 218 487 224 L 487 248" />
        <path className="cl thin" d="M 440 250 L 560 250" />
        <path className="cl fine" d="M 430 256 L 570 256" />
      </g>

      {/* Sauce boxeador orgánico */}
      <g className="fi d2">
        <path className="cl fine" d="M 542 248 Q 565 222 558 185 M 548 248 Q 582 230 575 200 M 552 248 Q 595 242 588 220" />
      </g>

      {/* ============================================================
          ALA DERECHA — Laberinto Medieval Irregular (Edificivm Orientale)
          ============================================================ */}
      {/* Muros exteriores quebrados */}
      <path className="cl bold draw d1" d="M 670 140 L 760 100 L 950 140 L 920 370 L 780 430 L 670 340 Z" />
      <path className="cl thin draw d2" d="M 682 148 L 758 112 L 938 148 L 910 362 L 782 418 L 682 332 Z" />

      {/* Pasillos laberínticos internos */}
      <path className="cl draw d2" d="M 682 220 L 780 200 L 840 260 L 925 240" />
      <path className="cl thin draw d3" d="M 730 125 L 730 210 L 695 280 L 782 320" />
      <path className="cl draw d3" d="M 782 320 L 782 418" />
      <path className="cl thin draw d2" d="M 820 115 L 860 200 L 920 190" />
      <path className="cl draw d3" d="M 840 260 L 890 320 L 914 320" />
      <path className="cl fine draw d3" d="M 740 300 L 840 280 L 860 390" />

      {/* Estructura circular integrada */}
      <circle className="cl draw d2" cx="840" cy="220" r="45" strokeDasharray="4 2" />
      <circle className="cl thin draw d3" cx="840" cy="220" r="30" />

      {/* Escaleras góticas */}
      <g className="fi d1">
        {[0, 5, 10, 15, 20].map((o, i) =>
          <line key={'e1' + i} className="cl fine" x1={700} y1={170+o} x2={725} y2={160+o} />
        )}
        {[0, 4, 8, 12, 16].map((o, i) =>
          <line key={'e2' + i} className="cl fine" x1={870+o} y1={160} x2={870+o} y2={185} />
        )}
        {[0, 5, 10, 15].map((o, i) =>
          <line key={'e3' + i} className="cl fine" x1={790} y1={340+o} x2={825} y2={340+o} />
        )}
      </g>

      {/* Torreones angulares */}
      <g className="fi d1">
        <circle className="cl" cx="760" cy="100" r="14" />
        <circle className="cl fine" cx="760" cy="100" r="6" />
        <circle className="cl" cx="950" cy="140" r="16" />
        <circle className="cl thin" cx="950" cy="140" r="9" />
        <circle className="cl" cx="920" cy="370" r="15" />
        <circle className="cl" cx="670" cy="340" r="12" />
      </g>

      {/* Etiquetas ala derecha */}
      <text className="mt medieval mt-sm mt-cap fi d2">
        <textPath href="#tp-east-arc" startOffset="50%" textAnchor="middle">
          Tvrris · Medivs
        </textPath>
      </text>
      <g className="fi d2">
        <text className="mt medieval mt-sm mt-cap" x="850" y="365" transform="rotate(12 850 365)">EDIFICIVM ORIENTALE</text>
        <text className="mt mt-xs mt-italic" x="910" y="115">Owlery</text>
        <text className="mt mt-xs mt-italic" x="935" y="395">Clocktower</text>
        <text className="mt mt-xs mt-italic" x="710" y="85">Astronomy</text>
        <text className="mt mt-xs mt-italic" x="742" y="240" transform="rotate(-45 742 240)">Ravenclaw Stair</text>
        <text className="mt mt-xs mt-italic" x="840" y="223" textAnchor="middle">Trophy Room</text>
        <text className="mt mt-xs mt-italic" x="635" y="475" transform="rotate(-12 635 475)">The Grand Staircase</text>
      </g>

      {/* ============================================================
          PARTE INFERIOR — Puente
          ============================================================ */}
      <g className="fi d2">
        <path className="cl" d="M 350 510 L 650 510" />
        <path className="cl thin" d="M 350 540 L 650 540" />
        {[365, 415, 465, 515, 565, 615].map((x, i) => (
          <path key={'br' + i} className="cl thin" d={`M ${x} 510 Q ${x + 15} 484 ${x + 30} 510`} />
        ))}
        {[365, 395, 425, 455, 485, 515, 545, 575, 605, 635].map((x, i) => (
          <line key={'bv' + i} className="cl fine" x1={x} y1={540} x2={x} y2={552} />
        ))}
      </g>

      <text className="mt mt-xs mt-italic fi d3">
        <textPath href="#tp-lower" startOffset="50%" textAnchor="middle">
          Lower Chambers Corridor &nbsp;·&nbsp; Prowling Passage
        </textPath>
      </text>

      {/* Conectores entre alas */}
      <g className="fi d2">
        <path className="cl thin" d="M 270 255 Q 350 250 432 255" />
        <path className="cl fine" d="M 270 270 Q 350 265 432 270" />
        <path className="cl thin" d="M 568 255 Q 630 250 672 255" />
        <path className="cl fine" d="M 568 270 Q 630 265 672 270" />
      </g>

      {/* Rosa de los vientos */}
      <g className="fi d3" transform="translate(110 520)">
        <circle className="cl gold" cx="0" cy="0" r="20" />
        <circle className="cl gold thin" cx="0" cy="0" r="12" />
        <path className="cl gold" d="M 0 -20 L 3 0 L 0 20 L -3 0 Z" />
        <path className="cl gold" d="M -20 0 L 0 3 L 20 0 L 0 -3 Z" />
        <text className="mt mt-xs medieval" x="0" y="-24" textAnchor="middle">N</text>
        <text className="mt mt-xs medieval" x="0" y="30"  textAnchor="middle">S</text>
        <text className="mt mt-xs medieval" x="-26" y="3"  textAnchor="middle">W</text>
        <text className="mt mt-xs medieval" x="26"  y="3"  textAnchor="middle">E</text>
      </g>

      {/* Estrellas decorativas */}
      <g className="fi d3">
        {[[315, 190], [625, 205], [335, 360], [615, 390], [75, 90], [940, 440]].map(([x, y], i) => (
          <g key={'star' + i} transform={`translate(${x} ${y})`}>
            <path className="cl gold fine" d="M 0 -5 L 1 -1 L 5 0 L 1 1 L 0 5 L -1 1 L -5 0 L -1 -1 Z" />
          </g>
        ))}
      </g>

      {/* Numeración de páginas */}
      <g className="fi d3">
        <text className="mt mt-xs" x="30"  y="22">cclix</text>
        <text className="mt mt-xs" x="970" y="22" textAnchor="end">cclx</text>
        <text className="mt mt-xs" x="30"  y="588">clxv</text>
        <text className="mt mt-xs" x="970" y="588" textAnchor="end">clxvi</text>
      </g>

      <text className="mt mt-xs fi d3" x="500" y="16" textAnchor="middle" style={{ letterSpacing: '3px' }}>
        OMNIBVS · MARAVDENTIBVS · BONVM · AVDERE · EST
      </text>
    </svg>
  )
}
