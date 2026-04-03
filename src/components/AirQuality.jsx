const aqiLevels = [
  { max: 20, label: 'Buena', color: '#22c55e', desc: 'Calidad de aire óptima' },
  { max: 40, label: 'Aceptable', color: '#84cc16', desc: 'Contaminación baja' },
  { max: 60, label: 'Moderada', color: '#eab308', desc: 'Contaminación media' },
  { max: 80, label: 'Mala', color: '#f97316', desc: 'Contaminación alta' },
  { max: 100, label: 'Muy mala', color: '#ef4444', desc: 'Contaminación muy alta' },
]

function getAqiInfo(value) {
  if (value == null) return { label: 'Sin datos', color: '#6b7280', desc: '' }
  for (const level of aqiLevels) {
    if (value <= level.max) return level
  }
  return { label: 'Extrema', color: '#7c3aed', desc: 'Condiciones extremas' }
}

const pollutants = [
  { key: 'pm2_5', name: 'PM2.5', unit: 'µg/m³', desc: 'Partículas finas' },
  { key: 'pm10', name: 'PM10', unit: 'µg/m³', desc: 'Partículas gruesas' },
  { key: 'ozone', name: 'O₃', unit: 'µg/m³', desc: 'Ozono' },
  { key: 'nitrogen_dioxide', name: 'NO₂', unit: 'µg/m³', desc: 'Dióxido de nitrógeno' },
]

export default function AirQuality({ data }) {
  if (!data?.current) return null

  const aqi = data.current.european_aqi ?? data.current.us_aqi
  const { label, color, desc } = getAqiInfo(aqi)

  return (
    <div className="aqi-card">
      <span className="card-title">CALIDAD DEL AIRE</span>
      <div className="aqi-hero">
        <div className="aqi-hero-left">
          <span className="aqi-value" style={{ color }}>{aqi ?? '--'}</span>
          <div className="aqi-bar-track">
            <div className="aqi-bar-fill" style={{ width: `${Math.min((aqi ?? 0) / 100 * 100, 100)}%`, backgroundColor: color }} />
          </div>
        </div>
        <div className="aqi-hero-right">
          <span className="aqi-label" style={{ color }}>{label}</span>
          <span className="aqi-desc">{desc}</span>
        </div>
      </div>
      <div className="aqi-pollutants">
        {pollutants.map((p) => {
          const val = data.current[p.key]
          if (val == null) return null
          const pct = Math.min(val / 50 * 100, 100)
          return (
            <div key={p.key} className="aqi-pollutant">
              <div className="aqi-pollutant-top">
                <span className="aqi-pollutant-name">{p.name}</span>
                <span className="aqi-pollutant-val">{val.toFixed(1)}</span>
              </div>
              <div className="aqi-pollutant-bar-track">
                <div className="aqi-pollutant-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="aqi-pollutant-unit">{p.unit}</span>
              <span className="aqi-pollutant-desc">{p.desc}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
