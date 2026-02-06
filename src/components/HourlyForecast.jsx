import WeatherIcon from './WeatherIcon'

export default function HourlyForecast({ hourly }) {
  if (!hourly) return null

  const hours = hourly.time
    .map((t, i) => ({
      time: t,
      temp: hourly.temperature_2m[i],
      precip: hourly.precipitation_probability[i],
      code: hourly.weather_code[i],
      wind: hourly.wind_speed_10m[i],
    }))
    .slice(0, 24)

  return (
    <div className="hourly-forecast">
      <h2 className="section-title">Próximas horas</h2>
      <div className="hourly-scroll">
        {hours.map((h) => {
          const time = new Date(h.time)
          const label = time.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })
          return (
            <div key={h.time} className="hourly-item">
              <span className="hourly-time">{label}</span>
              <WeatherIcon code={h.code} size={28} />
              <span className="hourly-temp">{Math.round(h.temp)}°</span>
              <span className="hourly-precip">{h.precip != null ? `${h.precip}%` : '--'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
