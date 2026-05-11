import { useMemo } from 'react'
import moonNew from '@meteocons/svg-static/fill/moon-new.svg'
import moonWaxingCrescent from '@meteocons/svg-static/fill/moon-waxing-crescent.svg'
import moonFirstQuarter from '@meteocons/svg-static/fill/moon-first-quarter.svg'
import moonWaxingGibbous from '@meteocons/svg-static/fill/moon-waxing-gibbous.svg'
import moonFull from '@meteocons/svg-static/fill/moon-full.svg'
import moonWaningGibbous from '@meteocons/svg-static/fill/moon-waning-gibbous.svg'
import moonLastQuarter from '@meteocons/svg-static/fill/moon-last-quarter.svg'
import moonWaningCrescent from '@meteocons/svg-static/fill/moon-waning-crescent.svg'

const moonIcons = {
  'Luna nueva': moonNew,
  'Luna creciente': moonWaxingCrescent,
  'Cuarto creciente': moonFirstQuarter,
  'Luna gibosa creciente': moonWaxingGibbous,
  'Luna llena': moonFull,
  'Luna gibosa menguante': moonWaningGibbous,
  'Cuarto menguante': moonLastQuarter,
  'Luna menguante': moonWaningCrescent,
}

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
    const name = getMoonName(p)
    return {
      name,
      illumination: getMoonIllumination(p),
      icon: moonIcons[name],
      nextFull: getNextEvent(now, 0.5),
      nextNew: getNextEvent(now, 0),
    }
  }, [])

  return (
    <div className="moon-card">
      <span className="card-title">FASE LUNAR</span>
      <div className="moon-body">
        <div className="moon-visual">
          <img
            src={data.icon}
            alt={data.name}
            width={80}
            height={80}
            style={{ display: 'block' }}
          />
        </div>
        <div className="moon-info">
          <span className="moon-name">{data.name}</span>
          <span className="moon-illumination">{data.illumination}% iluminada</span>
        </div>
      </div>
      <div className="moon-events">
        <div className="moon-event">
          <span className="moon-event-icon">
            <img src={moonFull} alt="" width={24} height={24} style={{ display: 'block' }} />
          </span>
          <div className="moon-event-info">
            <span className="moon-event-label">Luna llena</span>
            <span className="moon-event-date">{formatDate(data.nextFull)}</span>
          </div>
        </div>
        <div className="moon-event">
          <span className="moon-event-icon">
            <img src={moonNew} alt="" width={24} height={24} style={{ display: 'block' }} />
          </span>
          <div className="moon-event-info">
            <span className="moon-event-label">Luna nueva</span>
            <span className="moon-event-date">{formatDate(data.nextNew)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}