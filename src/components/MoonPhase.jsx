import { useMemo } from 'react'

function formatDate(d) {
  return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'short' })
}

function getMoonPhase(date) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  let jy = y, jm = m
  if (jm <= 2) { jy--; jm += 12 }
  const a = Math.floor(jy / 100)
  const b = 2 - a + Math.floor(a / 4)
  const jd = Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + d + b - 1524.5
  const daysSince = jd - 2451549.5
  return ((daysSince / 29.53058867) % 1 + 1) % 1
}

function getMoonName(phase) {
  if (phase < 0.03 || phase > 0.97) return 'Luna nueva'
  if (phase < 0.22) return 'Luna creciente'
  if (phase < 0.28) return 'Cuarto creciente'
  if (phase < 0.47) return 'Luna gibosa creciente'
  if (phase < 0.53) return 'Luna llena'
  if (phase < 0.72) return 'Luna gibosa menguante'
  if (phase < 0.78) return 'Cuarto menguante'
  return 'Luna menguante'
}

function getMoonIllumination(phase) {
  return Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100)
}

function getMoonPath(cx, cy, r, phase) {
  if (phase === 0.5 || (phase > 0.48 && phase < 0.52)) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r} ${r} 0 1 0 ${cx} ${cy - r} Z`
  }
  const theta = phase * 2 * Math.PI
  const rx = Math.abs(Math.sin(theta)) * r
  if (rx < 0.5) {
    if (phase < 0.5) return `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} L ${cx} ${cy - r} Z`
    return `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} L ${cx} ${cy - r} Z`
  }
  const outerSweep = phase < 0.5 ? 1 : 0
  const termSweep = phase < 0.5 ? 0 : 1
  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r}`, 'Z',
  ].join(' ')
}

function getNextEvent(date, target) {
  const phase = getMoonPhase(date)
  const days = ((target - phase + 1) % 1) * 29.53058867
  const next = new Date(date)
  next.setDate(next.getDate() + Math.round(days))
  return next
}

export default function MoonPhase() {
  const data = useMemo(() => {
    const now = new Date()
    const p = getMoonPhase(now)
    return {
      name: getMoonName(p),
      illumination: getMoonIllumination(p),
      path: getMoonPath(50, 50, 42, p),
      nextFull: getNextEvent(now, 0.5),
      nextNew: getNextEvent(now, 0),
    }
  }, [])

  return (
    <div className="moon-card">
      <span className="card-title">FASE LUNAR</span>
      <div className="moon-body">
        <div className="moon-visual">
          <svg width="90" height="90" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#moon-glow)" />
            <circle cx="50" cy="50" r="42" fill="#1a2332" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d={data.path} fill="#fef3c7" opacity="0.92" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </svg>
        </div>
        <div className="moon-info">
          <span className="moon-name">{data.name}</span>
          <span className="moon-illumination">{data.illumination}% iluminada</span>
          <div className="moon-phase-bar">
            <div className="moon-phase-dot" style={{ left: `${data.illumination}%` }} />
          </div>
        </div>
      </div>
      <div className="moon-events">
        <div className="moon-event">
          <span className="moon-event-icon">🌕</span>
          <div className="moon-event-info">
            <span className="moon-event-label">Luna llena</span>
            <span className="moon-event-date">{formatDate(data.nextFull)}</span>
          </div>
        </div>
        <div className="moon-event">
          <span className="moon-event-icon">🌑</span>
          <div className="moon-event-info">
            <span className="moon-event-label">Luna nueva</span>
            <span className="moon-event-date">{formatDate(data.nextNew)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
