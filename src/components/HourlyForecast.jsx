import { useState } from 'react'
import WeatherIcon from './WeatherIcon'
import WeatherChart from './WeatherChart'

function formatTime(iso) {
  const d = new Date(iso.replace('T', 'T') + ':00')
  return d.toLocaleString('es-PA', { hour: 'numeric', hour12: true })
}

const metrics = ['Temperatura', 'Sensación', 'Viento', 'UV', 'Humedad']

const chartColors = [
  'rgba(255,255,255,0.3)',
  'rgba(251, 191, 36, 0.5)',
  'rgba(96, 165, 250, 0.5)',
  'rgba(168, 85, 247, 0.5)',
  'rgba(74, 222, 128, 0.5)',
]

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
      const d = new Date(t.replace('T', 'T') + ':00')
      const h = d.getHours()
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      return {
        time: t,
        temp: Math.round(hourly.temperature_2m[i]),
        feelsLike: hourly.apparent_temperature?.[i] != null ? Math.round(hourly.apparent_temperature[i]) : null,
        wind: hourly.wind_speed_10m?.[i] != null ? Math.round(hourly.wind_speed_10m[i]) : null,
        uv: hourly.uv_index?.[i] != null ? hourly.uv_index[i] : null,
        humidity: hourly.relative_humidity_2m?.[i] != null ? hourly.relative_humidity_2m[i] : null,
        precip: hourly.precipitation_probability[i],
        code: hourly.weather_code[i],
        hour: h,
        dateStr,
        label: formatTime(t),
      }
    })
    .slice(0, 24)

  function chartData() {
    const key = ['temp', 'feelsLike', 'wind', 'uv', 'humidity'][metric]
    return hours.map((h) => h[key])
  }

  function chartUnit() {
    return ['°', '°', ' km/h', '', '%'][metric]
  }

  function chartLabels() {
    return hours.map((h) => h.label)
  }

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
      <WeatherChart data={chartData()} labels={chartLabels()} unit={chartUnit()} color={chartColors[metric]} />
      <div className="hourly-scroll">
        {hours.map((h) => {
          const isNow = h.dateStr === currentPanamaDate && h.hour === currentPanamaHour
          return (
            <div key={h.time} className={`hourly-item ${isNow ? 'now' : ''}`}>
              <span className="hourly-time">{isNow ? 'Ahora' : h.label}</span>
              <WeatherIcon code={h.code} isDay={h.hour >= 6 && h.hour < 18} size={26} />
              <span className="hourly-temp">{metricValue(h)}</span>
              {metric === 0 && h.precip != null && h.precip > 0 && (
                <span className="hourly-precip">{h.precip}%</span>
              )}
              {metric === 2 && h.wind != null && (
                <span className="hourly-wind-dir">{windArrow(h.wind)}</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="hourly-gradient-end" />
    </div>
  )
}

function windArrow(speed) {
  if (speed == null) return null
  const levels = ['—', '↑', '↗', '→', '↘', '↓', '↙', '←', '↖']
  const i = Math.round(speed / 5)
  return <span className="wind-arrow">{levels[Math.min(i, levels.length - 1)]}</span>
}
