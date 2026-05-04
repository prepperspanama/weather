function dewPoint(temp, rh) {
  const a = 17.27
  const b = 237.7
  const y = (a * temp) / (b + temp) + Math.log(rh / 100)
  return Math.round((b * y) / (a - y) * 10) / 10
}

const uvLevels = [
  { max: 2, label: 'Bajo', color: '#22c55e', msg: 'Sin protección necesaria' },
  { max: 5, label: 'Moderado', color: '#eab308', msg: 'Protección solar recomendada' },
  { max: 7, label: 'Alto', color: '#f97316', msg: 'Protección solar necesaria' },
  { max: 10, label: 'Muy alto', color: '#ef4444', msg: 'Protección solar indispensable' },
  { max: Infinity, label: 'Extremo', color: '#7c3aed', msg: 'Evitar exposición al sol' },
]

function getUvInfo(val) {
  if (val == null) return null
  return uvLevels.find((l) => val <= l.max)
}

const visibilityLevels = [
  { min: 20, label: 'Excelente' },
  { min: 10, label: 'Buena' },
  { min: 4, label: 'Moderada' },
  { min: 1, label: 'Mala' },
  { min: 0, label: 'Muy mala' },
]

function getVisibilityLabel(km) {
  if (km == null) return null
  return visibilityLevels.find((l) => km >= l.min)?.label
}

import WeatherIcon from './WeatherIcon'
import { convert, convertLabel } from '../utils/convert'

export default function CurrentWeather({ data, daily, units }) {
  if (!data) return null

  const temp = data.temperature_2m
  const feels = data.apparent_temperature
  const feelsDiff = temp - feels
  const showFeelsLike = Math.abs(feelsDiff) > 3
  const uvInfo = getUvInfo(data.uv_index)
  const visKm = data.visibility ? data.visibility / 1000 : null
  const visLabel = getVisibilityLabel(visKm)
  const dew = data.relative_humidity_2m != null ? dewPoint(temp, data.relative_humidity_2m) : null

  const tempUnit = convertLabel('temp', units.temp)
  const windUnit = convertLabel('wind', units.wind)
  const pressUnit = convertLabel('pressure', units.pressure)
  const precipUnit = convertLabel('precip', units.precip)

  return (
    <div className="current-section">
      <div className="current-condition-wrap">
          <WeatherIcon code={data.weather_code} isDay={data.is_day} size={36} animated />
        <p className="current-condition">{getCondition(data.weather_code)}</p>
      </div>
      <p className="current-temp">{convert(temp, 'temp', units.temp)}{tempUnit}</p>

      {daily && (
        <p className="current-hilo">
          Máx: {convert(daily.temperature_2m_max[0], 'temp', units.temp)}{tempUnit}
          <span className="hilo-sep"> </span>
          Mín: {convert(daily.temperature_2m_min[0], 'temp', units.temp)}{tempUnit}
        </p>
      )}

      {showFeelsLike && (
        <p className="current-feelslike">
          Sensación térmica de {convert(feels, 'temp', units.temp)}{tempUnit}
          {feelsDiff > 0 ? ' (más fresco)' : ' (más cálido)'}
        </p>
      )}

      <div className="detail-grid">
        <div className="detail-card">
          <span className="detail-label">SENSACIÓN</span>
          <p className="detail-value">{convert(feels, 'temp', units.temp)}{tempUnit}</p>
          {dew != null && <span className="detail-sub">Rocío {convert(dew, 'temp', units.temp)}{tempUnit}</span>}
        </div>
        <div className="detail-card">
          <span className="detail-label">HUMEDAD</span>
          <p className="detail-value">{data.relative_humidity_2m}%</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">VIENTO</span>
          <p className="detail-value">{convert(data.wind_speed_10m, 'wind', units.wind)}{windUnit}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">PRESIÓN</span>
          <p className="detail-value">{convert(data.surface_pressure, 'pressure', units.pressure)}{pressUnit}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">ÍNDICE UV</span>
          <p className="detail-value" style={uvInfo ? { color: uvInfo.color } : undefined}>
            {data.uv_index?.toFixed(1)}
          </p>
          {uvInfo && <span className="detail-sub">{uvInfo.label}</span>}
        </div>
        <div className="detail-card">
          <span className="detail-label">NUBOSIDAD</span>
          <p className="detail-value">{data.cloud_cover}%</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">PRECIPITACIÓN</span>
          <p className="detail-value">{convert(data.precipitation, 'precip', units.precip)}{precipUnit}</p>
          {data.weather_code != null && <span className="detail-sub">{precipType(data.weather_code)}</span>}
        </div>
        <div className="detail-card">
          <span className="detail-label">VISIBILIDAD</span>
          <p className="detail-value">{visKm ? `${visKm.toFixed(1)} km` : '--'}</p>
          {visLabel && <span className="detail-sub">{visLabel}</span>}
        </div>
      </div>

      {uvInfo && uvInfo.max > 5 && (
        <p className="uv-notice">{uvInfo.msg}</p>
      )}
    </div>
  )
}

function getCondition(code) {
  const map = {
    0: 'Despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado',
    3: 'Nublado', 45: 'Niebla', 48: 'Niebla con escarcha',
    51: 'Llovizna ligera', 53: 'Llovizna', 55: 'Llovizna densa',
    56: 'Llovizna helada', 57: 'Llovizna helada',
    61: 'Lluvia ligera', 63: 'Lluvia', 65: 'Lluvia intensa',
    66: 'Lluvia helada', 67: 'Lluvia helada',
    71: 'Nieve ligera', 73: 'Nieve', 75: 'Nieve intensa', 77: 'Granos de nieve',
    80: 'Chubascos', 81: 'Chubascos', 82: 'Chubascos fuertes',
    85: 'Chubascos de nieve', 86: 'Chubascos de nieve',
    95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta intensa',
  }
  return map[code] || ''
}

function precipType(code) {
  if (code == null) return ''
  if (code <= 1) return ''
  if (code <= 3) return 'Posible lluvia'
  if (code <= 48) return 'Niebla'
  if (code <= 57) return 'Llovizna'
  if (code <= 67) return 'Lluvia'
  if (code <= 77) return 'Nieve'
  if (code <= 82) return 'Chubascos'
  if (code <= 86) return 'Chubascos de nieve'
  return 'Tormenta'
}
