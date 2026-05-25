import { useElapsed } from '../hooks/useElapsed.js'
import { BASE_DATE } from '../config.js'

export default function PhaseMessage({ onReset }) {
  const { days, hours, minutes, seconds } = useElapsed(BASE_DATE)
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="phase-3">
      <div className="scroll-container">
        <div className="scroll-rod top" />
        <div className="scroll-rod bottom" />

        <div className="scroll-header">
          <h1>Para Anabella</h1>
          <div className="deco">✦ · · · ✦ · · · ✦</div>
        </div>

        <div className="counter" aria-label="Tiempo a tu lado">
          <div className="counter-cell">
            <div className="num">{days}</div>
            <div className="lbl">Días</div>
          </div>
          <div className="counter-cell">
            <div className="num">{pad(hours)}</div>
            <div className="lbl">Horas</div>
          </div>
          <div className="counter-cell">
            <div className="num">{pad(minutes)}</div>
            <div className="lbl">Minutos</div>
          </div>
          <div className="counter-cell">
            <div className="num">{pad(seconds)}</div>
            <div className="lbl">Segundos</div>
          </div>
        </div>

        <div className="photo-grid">
          <div className="photo-frame">
            <img src="/assets/foto1.jpg" alt="Kevin y Anabella" />
            <div className="photo-caption">Caras Hechizantes</div>
          </div>
          <div className="photo-frame">
            <img src="/assets/foto2.jpg" alt="Graduación" />
            <div className="photo-caption">Graduacion magica</div>
          </div>
          <div className="photo-frame">
            <img src="/assets/foto3.jpg" alt="Kevin y Anabella" />
            <div className="photo-caption">Travesura Formal</div>
          </div>
        </div>

        <div className="letter">
          <div className="ornament">✦ ✧ ✦</div>
          <p>
            Si este mapa funcionara de verdad, no haría falta. Bastaría con buscarte
            entre todas estas líneas y verte aparecer, donde sea, siempre cerca.
          </p>
          <p>
            Pero como la única magia que tenemos es la que hacemos juntos, te dejo
            este pergamino — con nuestros pasos cruzándose en el centro, como en la
            vida real — para decirte algo: te elijo en el día a día, en lo
            ordinario, en lo cansado, en lo malo, en lo bonito. Cada segundo que cuenta este
            reloj es un segundo en el que prefiero estar contigo.
          </p>
          <p>
            Gracias por ser la mejor de mis travesuras.
          </p>
          <div className="signature">— Kevin</div>
          <div className="ornament">✦ ✧ ✦</div>
        </div>

        <div className="mischief-button-wrap">
          <button className="mischief-button" onClick={onReset}>
            Travesura realizada
          </button>
        </div>
      </div>
    </div>
  )
}
