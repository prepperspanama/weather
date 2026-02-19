const aqiLevels = [
  { max: 20, label: 'Buena', color: '#22c55e' },
  { max: 40, label: 'Aceptable', color: '#84cc16' },
  { max: 60, label: 'Moderada', color: '#eab308' },
  { max: 80, label: 'Mala', color: '#f97316' },
  { max: 100, label: 'Muy mala', color: '#ef4444' },
]

function getAqiInfo(value) {
  if (value == null) return { label: 'Sin datos', color: '#6b7280' }
  for (const level of aqiLevels) {
    if (value <= level.max) return level
  }
  return { label: 'Extrema', color: '#7c3aed' }
}

export default function AirQuality({ data }) {
  if (!data?.current) return null

  const aqi = data.current.european_aqi ?? data.current.us_aqi
  const { label, color } = getAqiInfo(aqi)

  return (
    <div className="aqi-card">
      <span className="card-title">CALIDAD DEL AIRE</span>
      <div className="aqi-body">
        <div className="aqi-main">
          <span className="aqi-value" style={{ color }}>{aqi ?? '--'}</span>
          <span className="aqi-label">{label}</span>
        </div>
        <div className="aqi-bar-track">
          <div className="aqi-bar-fill" style={{ width: `${Math.min((aqi ?? 0) / 100 * 100, 100)}%`, backgroundColor: color }} />
        </div>
        <div className="aqi-pollutants">
          {data.current.pm2_5 != null && (
            <span className="aqi-pollutant">
              <span className="aqi-pollutant-name">PM2.5</span>
              <span>{data.current.pm2_5.toFixed(1)}</span>
            </span>
          )}
          {data.current.pm10 != null && (
            <span className="aqi-pollutant">
              <span className="aqi-pollutant-name">PM10</span>
              <span>{data.current.pm10.toFixed(1)}</span>
            </span>
          )}
          {data.current.ozone != null && (
            <span className="aqi-pollutant">
              <span className="aqi-pollutant-name">O₃</span>
              <span>{data.current.ozone.toFixed(1)}</span>
            </span>
          )}
          {data.current.nitrogen_dioxide != null && (
            <span className="aqi-pollutant">
              <span className="aqi-pollutant-name">NO₂</span>
              <span>{data.current.nitrogen_dioxide.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
