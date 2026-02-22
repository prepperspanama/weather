import { useMemo } from 'react'
import { getMoonPhase, getMoonName, getMoonIllumination, getMoonPath, getNextFullMoon, getNextNewMoon } from '../utils/moonPhase'

function formatDate(d) {
  return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'short' })
}

export default function MoonPhase() {
  const data = useMemo(() => {
    const now = new Date()
    const p = getMoonPhase(now)
    return {
      name: getMoonName(p),
      illumination: getMoonIllumination(p),
      path: getMoonPath(50, 50, 44, p),
      nextFull: getNextFullMoon(now),
      nextNew: getNextNewMoon(now),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="moon-card">
      <span className="card-title">FASE LUNAR</span>
      <div className="moon-body">
        <div className="moon-visual">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <path d={data.path} fill="#fef3c7" opacity="0.95" />
          </svg>
        </div>
        <div className="moon-info">
          <span className="moon-name">{data.name}</span>
          <span className="moon-illumination">{data.illumination}% iluminada</span>
        </div>
      </div>
      <div className="moon-events">
        <span className="moon-event">
          <span className="moon-event-label">Luna llena</span>
          <span className="moon-event-date">{formatDate(data.nextFull)}</span>
        </span>
        <span className="moon-event">
          <span className="moon-event-label">Luna nueva</span>
          <span className="moon-event-date">{formatDate(data.nextNew)}</span>
        </span>
      </div>
    </div>
  )
}
