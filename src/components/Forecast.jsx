import WeatherIcon from './WeatherIcon'

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

function windDir(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  if (deg == null) return ''
  return dirs[Math.round(deg / 22.5) % 16]
}

export default function Forecast({ daily }) {
  if (!daily) return null

  const allMax = Math.max(...daily.temperature_2m_max)
  const allMin = Math.min(...daily.temperature_2m_min)
  const range = allMax - allMin || 1

  return (
    <div className="forecast-card">
      <span className="card-title">PRONÓSTICO DE 7 DÍAS</span>
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

          return (
            <div key={date} className={`forecast-row ${i === 0 ? 'today' : ''}`}>
              <span className="forecast-day">{dayName}</span>
              <WeatherIcon code={daily.weather_code[i]} size={22} />

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

              <div className="forecast-extra-row">
                {sunrise && sunset && (
                  <span className="forecast-suntime">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    </svg>
                    {formatTime(sunrise)}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/>
                      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                    </svg>
                    {formatTime(sunset)}
                  </span>
                )}
                <span className="forecast-wind">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                  </svg>
                  {Math.round(wind)} km/h {windDir(daily.wind_direction_10m_dominant?.[i])}
                  {gust && gust > wind + 5 && (
                    <span className="forecast-gust"> racha {Math.round(gust)}</span>
                  )}
                </span>
                <span className="forecast-uv">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
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
