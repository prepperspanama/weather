import WeatherIcon from './WeatherIcon'

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

function localDateFromStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function Forecast({ daily }) {
  if (!daily) return null

  return (
    <div className="forecast-card">
      <span className="card-title">PRONÓSTICO DE 7 DÍAS</span>
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const dayName = i === 0 ? 'Hoy' : dayNames[localDateFromStr(date).getDay()]
          const max = Math.round(daily.temperature_2m_max[i])
          const min = Math.round(daily.temperature_2m_min[i])
          const precip = daily.precipitation_sum[i]
          return (
            <div key={date} className={`forecast-row ${i === 0 ? 'today' : ''}`}>
              <span className="forecast-day">{dayName}</span>
              <WeatherIcon code={daily.weather_code[i]} size={22} />
              <span className="forecast-bar-wrap">
                <span className="forecast-bar">
                  <span className="forecast-fill" style={{ left: `${((min - 15) / 35) * 100}%`, right: `${100 - ((max - 15) / 35) * 100}%` }} />
                </span>
              </span>
              <span className="forecast-precip-wrap">
                {precip > 0 && <span className="forecast-precip">{precip} mm</span>}
              </span>
              <span className="forecast-temps">
                <span className="forecast-max">{max}°</span>
                <span className="forecast-min">{min}°</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
