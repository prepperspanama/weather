import { useState } from 'react'
import WeatherIcon from './WeatherIcon'
import WeatherChart from './WeatherChart'
import { convert, convertLabel } from '../utils/convert'

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

const uvLevels = [
  { max: 2, label: 'Bajo' },
  { max: 5, label: 'Moderado' },
  { max: 7, label: 'Alto' },
  { max: 10, label: 'Muy alto' },
  { max: Infinity, label: 'Extremo' },
]

function uvLabel(val) {
  if (val == null) return ''
  return uvLevels.find((l) => val <= l.max)?.label || ''
}

export default function Forecast({ daily, units }) {
  const [expanded, setExpanded] = useState(null)
  if (!daily) return null

  return (
    <div className="forecast-card">
      <span className="card-title">PRONÓSTICO DE 10 DÍAS</span>
      <WeatherChart
        data={daily.temperature_2m_max.map((v) => convert(v, 'temp', units.temp))}
        labels={daily.time.map((d, i) => i === 0 ? 'Hoy' : dayNames[localDateFromStr(d).getDay()].slice(0, 3))}
        unit={convertLabel('temp', units.temp)}
        color="rgba(251, 191, 36, 0.5)"
        height={80}
      />
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const dayName = i === 0 ? 'Hoy' : dayNames[localDateFromStr(date).getDay()]
          const max = convert(daily.temperature_2m_max[i], 'temp', units.temp)
          const min = convert(daily.temperature_2m_min[i], 'temp', units.temp)
          const precipProb = daily.precipitation_probability_max[i]
          const wind = daily.wind_speed_10m_max[i]
          const gust = daily.wind_gusts_10m_max[i]
          const uv = daily.uv_index_max[i]
          const sunrise = daily.sunrise?.[i]
          const sunset = daily.sunset?.[i]

          const isExpanded = expanded === i
          const daylight = daily.daylight_duration?.[i]
          const precipHours = daily.precipitation_hours?.[i]

          const tempUnit = convertLabel('temp', units.temp)

          return (
            <div
              key={date}
              className={`forecast-row ${i === 0 ? 'today' : ''} ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpanded(isExpanded ? null : i)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(isExpanded ? null : i) }}
            >
              <span className="forecast-day">{dayName}</span>
              <WeatherIcon code={daily.weather_code[i]} isDay size={20} animated />
              <span className="forecast-temps">
                <span className="forecast-max">{max}{tempUnit}</span>
                <span className="forecast-temp-sep">/</span>
                <span className="forecast-min">{min}{tempUnit}</span>
              </span>

              <div className={`forecast-expanded ${isExpanded ? 'visible' : ''}`}>
                <div className="fe-grid">
                  {sunrise && (
                    <div className="fe-item">
                      <span className="fe-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                          <line x1="12" y1="2" x2="12" y2="4.5" />
                          <line x1="12" y1="19.5" x2="12" y2="22" />
                          <line x1="4.4" y1="4.4" x2="5.8" y2="5.8" />
                          <line x1="18.2" y1="18.2" x2="19.6" y2="19.6" />
                        </svg>
                      </span>
                      <span className="fe-label">Salida</span>
                      <span className="fe-value">{formatTime(sunrise)}</span>
                    </div>
                  )}
                  {sunset && (
                    <div className="fe-item">
                      <span className="fe-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 18a5 5 0 0 0-10 0" strokeWidth="1.8" />
                          <line x1="12" y1="9" x2="12" y2="3" strokeWidth="1.8" />
                          <line x1="5" y1="12" x2="7" y2="12" strokeWidth="1.2" opacity="0.5" />
                          <line x1="17" y1="12" x2="19" y2="12" strokeWidth="1.2" opacity="0.5" />
                        </svg>
                      </span>
                      <span className="fe-label">Puesta</span>
                      <span className="fe-value">{formatTime(sunset)}</span>
                    </div>
                  )}
                  {daylight && (
                    <div className="fe-item">
                      <span className="fe-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="5" strokeWidth="1.8" />
                          <line x1="12" y1="1" x2="12" y2="3" strokeWidth="1.8" />
                          <line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.8" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.2" opacity="0.6" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.2" opacity="0.6" />
                        </svg>
                      </span>
                      <span className="fe-label">Luz</span>
                      <span className="fe-value">{formatDuration(daylight)}</span>
                    </div>
                  )}
                  <div className="fe-item">
                    <span className="fe-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4a3 3 0 1 1 3 3H4" strokeWidth="1.8" />
                        <path d="M10 20a3 3 0 1 0 3-3H4" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <span className="fe-label">Viento</span>
                    <span className="fe-value">
                      {convert(wind, 'wind', units.wind)}{convertLabel('wind', units.wind)}
                      <span className="fe-dir">{windDir(daily.wind_direction_10m_dominant?.[i])}</span>
                      {gust && gust > wind + 5 && (
                        <span className="fe-gust">Racha {Math.round(gust)}{convertLabel('wind', units.wind)}</span>
                      )}
                    </span>
                  </div>
                  <div className="fe-item">
                    <span className="fe-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4.5" strokeWidth="1.8" />
                        <line x1="12" y1="1" x2="12" y2="3.5" strokeWidth="1.8" />
                        <line x1="12" y1="20.5" x2="12" y2="23" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <span className="fe-label">UV</span>
                    <span className="fe-value">{uv?.toFixed(1)} <span className="fe-sub">{uvLabel(uv)}</span></span>
                  </div>
                  {precipProb > 0 && (
                    <div className="fe-item">
                      <span className="fe-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z" strokeWidth="1.8" />
                          <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                      </span>
                      <span className="fe-label">Lluvia</span>
                      <span className="fe-value">{precipProb}%</span>
                    </div>
                  )}
                  {precipHours != null && precipHours > 0 && (
                    <div className="fe-item">
                      <span className="fe-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="6" y1="5" x2="8" y2="5" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="6" y1="19" x2="8" y2="19" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="16" y1="5" x2="18" y2="5" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="16" y1="19" x2="18" y2="19" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="fe-label">Horas lluvia</span>
                      <span className="fe-value">{precipHours}h</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
