import { useState } from 'react'
import WeatherIcon from './WeatherIcon'
import WeatherChart from './WeatherChart'

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

function localDateFromStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatTime(iso) {
  if (!iso) return ''
  const [, , , h, min] = iso.split(/[-T:]/).map(Number)
  const period = h >= 12 ? 'p.m.' : 'a.m.'
  const hour12 = h % 12 || 12
  return `${hour12}:${String(min).padStart(2, '0')} ${period}`
}

function formatDuration(seconds) {
  if (seconds == null) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return `${h}h ${m}min`
}

function windDir(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  if (deg == null) return ''
  return dirs[Math.round(deg / 22.5) % 16]
}

export default function Forecast({ daily }) {
  const [expanded, setExpanded] = useState(null)
  if (!daily) return null

  const allMax = Math.max(...daily.temperature_2m_max)
  const allMin = Math.min(...daily.temperature_2m_min)
  const range = allMax - allMin || 1

  return (
    <div className="forecast-card">
      <span className="card-title">PRONÓSTICO DE 10 DÍAS</span>
      <WeatherChart
        data={daily.temperature_2m_max.map(Math.round)}
        labels={daily.time.map((d, i) => i === 0 ? 'Hoy' : dayNames[localDateFromStr(d).getDay()].slice(0, 3))}
        unit="°"
        color="rgba(251, 191, 36, 0.5)"
        height={80}
      />
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const dayName = i === 0 ? 'Hoy' : dayNames[localDateFromStr(date).getDay()]
          const max = Math.round(daily.temperature_2m_max[i])
          const min = Math.round(daily.temperature_2m_min[i])
          const precip = daily.precipitation_sum[i]
          const precipProb = daily.precipitation_probability_max[i]
          const wind = daily.wind_speed_10m_max[i]
          const gust = daily.wind_gusts_10m_max[i]
          const uv = daily.uv_index_max[i]
          const sunrise = daily.sunrise?.[i]
          const sunset = daily.sunset?.[i]

          const left = Math.max(0, ((min - allMin) / range) * 100)
          const right = Math.max(0, ((allMax - max) / range) * 100)

          const isExpanded = expanded === i
          const daylight = daily.daylight_duration?.[i]
          const precipHours = daily.precipitation_hours?.[i]

          return (
            <div
              key={date}
              className={`forecast-row ${i === 0 ? 'today' : ''} ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpanded(isExpanded ? null : i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(isExpanded ? null : i) }}
            >
              <span className="forecast-day">{dayName}</span>
              <WeatherIcon code={daily.weather_code[i]} isDay size={22} />

              <div className="forecast-center">
                {precipProb > 0 && (
                  <span className="forecast-precip-bar-wrap">
                    <span className="forecast-precip-bar-label">{precipProb}%</span>
                    <span className="forecast-precip-bar">
                      <span className="forecast-precip-fill" style={{ width: `${precipProb}%` }} />
                    </span>
                  </span>
                )}

                <span className="forecast-bar-wrap">
                  <span className="forecast-bar">
                    <span className="forecast-fill" style={{ left: `${left}%`, right: `${right}%` }} />
                  </span>
                </span>
              </div>

              <span className="forecast-precip-amount">
                {precip > 0 ? `${precip} mm` : ''}
              </span>

              <span className="forecast-temps">
                <span className="forecast-max">{max}°</span>
                <span className="forecast-min">{min}°</span>
              </span>

              <div className={`forecast-extra-row ${isExpanded ? 'visible' : ''}`}>
                {sunrise && sunset && (
                  <span className="forecast-suntime">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                      <line x1="12" y1="2" x2="12" y2="4.5" />
                      <line x1="12" y1="19.5" x2="12" y2="22" />
                      <line x1="4.4" y1="4.4" x2="5.8" y2="5.8" />
                      <line x1="18.2" y1="18.2" x2="19.6" y2="19.6" />
                    </svg>
                    {formatTime(sunrise)}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 18a5 5 0 0 0-10 0" strokeWidth="1.8" />
                      <line x1="12" y1="9" x2="12" y2="3" strokeWidth="1.8" />
                      <line x1="5" y1="12" x2="7" y2="12" strokeWidth="1.2" opacity="0.5" />
                      <line x1="17" y1="12" x2="19" y2="12" strokeWidth="1.2" opacity="0.5" />
                    </svg>
                    {formatTime(sunset)}
                  </span>
                )}
                {daylight && (
                  <span className="forecast-daylight">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" strokeWidth="1.8" />
                      <line x1="12" y1="1" x2="12" y2="3" strokeWidth="1.8" />
                      <line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.8" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.2" opacity="0.6" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.2" opacity="0.6" />
                      <line x1="1" y1="12" x2="3" y2="12" strokeWidth="1.2" opacity="0.6" />
                      <line x1="21" y1="12" x2="23" y2="12" strokeWidth="1.2" opacity="0.6" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.2" opacity="0.6" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                    {formatDuration(daylight)}
                  </span>
                )}
                {precipHours != null && precipHours > 0 && (
                  <span className="forecast-precip-hours">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20" strokeWidth="1.5" opacity="0.5" />
                      <path d="M7 7l10 10M17 7l-10 10" strokeWidth="1" opacity="0.3" />
                      <line x1="6" y1="5" x2="8" y2="5" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="6" y1="19" x2="8" y2="19" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="16" y1="5" x2="18" y2="5" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="16" y1="19" x2="18" y2="19" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {precipHours}h
                  </span>
                )}
                <span className="forecast-wind">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4a3 3 0 1 1 3 3H4" strokeWidth="1.8" />
                    <path d="M10 20a3 3 0 1 0 3-3H4" strokeWidth="1.8" />
                    <path d="M20 10a2.5 2.5 0 1 0-2.5 2.5H4" strokeWidth="1.8" />
                  </svg>
                  {Math.round(wind)} km/h {windDir(daily.wind_direction_10m_dominant?.[i])}
                  {gust && gust > wind + 5 && (
                    <span className="forecast-gust"> racha {Math.round(gust)}</span>
                  )}
                </span>
                <span className="forecast-uv">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4.5" strokeWidth="1.8" />
                    <line x1="12" y1="1" x2="12" y2="3.5" strokeWidth="1.8" />
                    <line x1="12" y1="20.5" x2="12" y2="23" strokeWidth="1.8" />
                    <line x1="3" y1="12" x2="5.5" y2="12" strokeWidth="1.2" opacity="0.4" />
                    <line x1="18.5" y1="12" x2="21" y2="12" strokeWidth="1.2" opacity="0.4" />
                  </svg>
                  UV {uv?.toFixed(1)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
