import { getWeatherInfo } from '../utils/weatherCodes'
import WeatherIcon from './WeatherIcon'

function windDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export default function CurrentWeather({ data }) {
  if (!data) return null

  const info = getWeatherInfo(data.weather_code)

  return (
    <div className="current-weather">
      <div className="current-main">
        <WeatherIcon code={data.weather_code} size={80} />
        <div className="current-temp">
          <span className="temp-value">{Math.round(data.temperature_2m)}°</span>
          <span className="temp-desc">{info.description}</span>
        </div>
      </div>
      <div className="current-details">
        <div className="detail-item">
          <span className="detail-label">Sensación</span>
          <span className="detail-value">{Math.round(data.apparent_temperature)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humedad</span>
          <span className="detail-value">{data.relative_humidity_2m}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Viento</span>
          <span className="detail-value">{Math.round(data.wind_speed_10m)} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Dirección</span>
          <span className="detail-value">{windDirection(data.wind_direction_10m)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Precipitación</span>
          <span className="detail-value">{data.precipitation} mm</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Presión</span>
          <span className="detail-value">{Math.round(data.surface_pressure)} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Índice UV</span>
          <span className="detail-value">{data.uv_index?.toFixed(1)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nubosidad</span>
          <span className="detail-value">{data.cloud_cover}%</span>
        </div>
      </div>
    </div>
  )
}
