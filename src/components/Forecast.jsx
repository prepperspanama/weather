import { getWeatherInfo } from '../utils/weatherCodes'
import WeatherIcon from './WeatherIcon'

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function Forecast({ daily }) {
  if (!daily) return null

  return (
    <div className="forecast">
      <h2 className="section-title">Pronóstico 7 días</h2>
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i])
          const dayName = i === 0 ? 'Hoy' : dayNames[new Date(date).getDay()]
          return (
            <div key={date} className="forecast-day">
              <span className="forecast-day-name">{dayName}</span>
              <WeatherIcon code={daily.weather_code[i]} size={32} />
              <span className="forecast-desc">{info.description}</span>
              <div className="forecast-temps">
                <span className="forecast-max">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="forecast-min">{Math.round(daily.temperature_2m_min[i])}°</span>
              </div>
              <span className="forecast-precip">{daily.precipitation_sum[i]} mm</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
