import { useState } from 'react'
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

const metrics = ['Temperatura', 'Sensación', 'Viento', 'UV', 'Humedad']

export default function HourlyForecast({ hourly }) {
  const [metric, setMetric] = useState(0)
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
        feelsLike: hourly.apparent_temperature?.[i] != null ? Math.round(hourly.apparent_temperature[i]) : null,
        wind: hourly.wind_speed_10m?.[i] != null ? Math.round(hourly.wind_speed_10m[i]) : null,
        uv: hourly.uv_index?.[i] != null ? hourly.uv_index[i] : null,
        humidity: hourly.relative_humidity_2m?.[i] != null ? hourly.relative_humidity_2m[i] : null,
        precip: hourly.precipitation_probability[i],
        code: hourly.weather_code[i],
        dateStr,
        hour: p.hour,
      }
    })
    .slice(0, 24)

  function metricValue(h) {
    switch (metric) {
      case 0: return h.temp != null ? `${h.temp}°` : null
      case 1: return h.feelsLike != null ? `${h.feelsLike}°` : null
      case 2: return h.wind != null ? `${h.wind} km/h` : null
      case 3: return h.uv != null ? h.uv.toFixed(1) : null
      case 4: return h.humidity != null ? `${h.humidity}%` : null
      default: return `${h.temp}°`
    }
  }

  return (
    <div className="hourly-card">
      <span className="card-title">PRONÓSTICO POR HORA</span>
      <div className="hourly-metrics">
        {metrics.map((m, i) => (
          <button
            key={m}
            className={`hourly-metric-btn ${i === metric ? 'active' : ''}`}
            onClick={() => setMetric(i)}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="hourly-scroll">
        {hours.map((h) => {
          const isNow = h.dateStr === currentPanamaDate && h.hour === currentPanamaHour
          return (
            <div key={h.time} className={`hourly-item ${isNow ? 'now' : ''}`}>
              <span className="hourly-time">{isNow ? 'Ahora' : formatHourLabel(h.hour)}</span>
              <WeatherIcon code={h.code} isDay={h.hour >= 6 && h.hour < 18} size={26} />
              <span className="hourly-temp">{metricValue(h)}</span>
              {metric === 0 && h.precip != null && h.precip > 0 && (
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
