import WeatherIcon from './WeatherIcon'

export default function HourlyForecast({ hourly }) {
  if (!hourly) return null

  const hours = hourly.time
    .map((t, i) => ({
      time: t,
      temp: Math.round(hourly.temperature_2m[i]),
      precip: hourly.precipitation_probability[i],
      code: hourly.weather_code[i],
    }))
    .slice(0, 24)

  const now = new Date()
  const currentHour = now.getHours()
  const currentDateStr = now.toDateString()

  return (
    <div className="hourly-card">
      <span className="card-title">PRONÓSTICO POR HORA</span>
      <div className="hourly-scroll">
        {hours.map((h) => {
          const d = new Date(h.time)
          const isNow = d.toDateString() === currentDateStr && d.getHours() === currentHour
          return (
            <div key={h.time} className={`hourly-item ${isNow ? 'now' : ''}`}>
              <span className="hourly-time">{isNow ? 'Ahora' : d.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', '').replace('a.m.', 'a.m.').replace('p.m.', 'p.m.')}</span>
              <WeatherIcon code={h.code} size={26} />
              <span className="hourly-temp">{h.temp}°</span>
              {h.precip != null && h.precip > 0 && (
                <span className="hourly-precip">{h.precip}%</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="hourly-gradient-end" />
    </div>
  )
}
