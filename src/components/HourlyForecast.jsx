import WeatherIcon from './WeatherIcon'

function parseLocalTime(iso) {
  const [datePart, timePart] = iso.split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [h, min] = timePart ? timePart.split(':').map(Number) : [0, 0]
  return { year: y, month: m - 1, day: d, hour: h, minute: min }
}

function formatHourLabel(h) {
  const period = h >= 12 ? 'p.m.' : 'a.m.'
  const hour12 = h % 12 || 12
  return `${hour12}${period}`
}

export default function HourlyForecast({ hourly }) {
  if (!hourly) return null

  const now = new Date()
  const panamaOffset = -5 * 60
  const localOffset = now.getTimezoneOffset()
  const panamaNow = new Date(now.getTime() + (localOffset + panamaOffset) * 60000)
  const currentPanamaHour = panamaNow.getHours()
  const currentPanamaDate = `${panamaNow.getFullYear()}-${String(panamaNow.getMonth() + 1).padStart(2, '0')}-${String(panamaNow.getDate()).padStart(2, '0')}`

  const hours = hourly.time
    .map((t, i) => {
      const p = parseLocalTime(t)
      const dateStr = `${p.year}-${String(p.month + 1).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`
      return {
        time: t,
        temp: Math.round(hourly.temperature_2m[i]),
        precip: hourly.precipitation_probability[i],
        code: hourly.weather_code[i],
        dateStr,
        hour: p.hour,
      }
    })
    .slice(0, 24)

  return (
    <div className="hourly-card">
      <span className="card-title">PRONÓSTICO POR HORA</span>
      <div className="hourly-scroll">
        {hours.map((h) => {
          const isNow = h.dateStr === currentPanamaDate && h.hour === currentPanamaHour
          return (
            <div key={h.time} className={`hourly-item ${isNow ? 'now' : ''}`}>
              <span className="hourly-time">{isNow ? 'Ahora' : formatHourLabel(h.hour)}</span>
              <WeatherIcon code={h.code} isDay={h.hour >= 6 && h.hour < 18} size={26} />
              <span className="hourly-temp">{h.temp}°</span>
              {h.precip != null && h.precip > 0 && (
                <span className="hourly-precip">{h.precip}%</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="hourly-gradient-end" />
    </div>
  )
}
