export default function CurrentWeather({ data, daily }) {
  if (!data) return null

  return (
    <div className="current-section">
      <p className="current-condition">{getCondition(data.weather_code)}</p>
      <p className="current-temp">{Math.round(data.temperature_2m)}°</p>

      {daily && (
        <p className="current-hilo">
          H: {Math.round(daily.temperature_2m_max[0])}°
          <span className="hilo-sep"> </span>
          L: {Math.round(daily.temperature_2m_min[0])}°
        </p>
      )}

      <div className="detail-grid">
        <div className="detail-card">
          <span className="detail-label">SENSACIÓN</span>
          <p className="detail-value">{Math.round(data.apparent_temperature)}°C</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">HUMEDAD</span>
          <p className="detail-value">{data.relative_humidity_2m}%</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">VIENTO</span>
          <p className="detail-value">{Math.round(data.wind_speed_10m)} km/h</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">PRESIÓN</span>
          <p className="detail-value">{Math.round(data.surface_pressure)} hPa</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">ÍNDICE UV</span>
          <p className="detail-value">{data.uv_index?.toFixed(1)}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">NUBOSIDAD</span>
          <p className="detail-value">{data.cloud_cover}%</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">PRECIPITACIÓN</span>
          <p className="detail-value">{data.precipitation} mm</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">VISIBILIDAD</span>
          <p className="detail-value">{data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : '--'}</p>
        </div>
      </div>
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
