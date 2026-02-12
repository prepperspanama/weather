import { useState, useCallback, useMemo } from 'react'
import { panamaCities } from './utils/weatherCodes'
import { useWeather } from './hooks/useWeather'
import CitySelector from './components/CitySelector'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import Forecast from './components/Forecast'
import MoonPhase from './components/MoonPhase'
import './App.css'

const gradients = [
  { match: (code, day) => day === 1 && code <= 1, colors: ['#1e3c72', '#2a5298'] },
  { match: (_c, day) => day === 0, colors: ['#0a1628', '#1a2744'] },
  { match: (code) => code <= 2, colors: ['#2c3e50', '#4a6b8a'] },
  { match: (code) => code <= 3, colors: ['#3a4a5c', '#5a6f84'] },
  { match: (code) => code <= 57, colors: ['#2d3748', '#4a5568'] },
  { match: (code) => code <= 67 || (code >= 80 && code <= 82), colors: ['#1a2a3a', '#2d4a6b'] },
  { match: (code) => code <= 77, colors: ['#2a3a4a', '#4a6a7a'] },
  { match: () => true, colors: ['#1a1a2e', '#2d2d44'] },
]

function getGradient(code, isDay) {
  const g = gradients.find((g) => g.match(code, isDay)) || gradients[gradients.length - 1]
  return g.colors
}

function App() {
  const [city, setCity] = useState(panamaCities[0])
  const { current, daily, hourly, loading, error, refetch } = useWeather(city.lat, city.lon)

  const gradient = useMemo(() => {
    if (!current) return ['#0a1628', '#1a2744']
    return getGradient(current.weather_code, current.is_day)
  }, [current])

  const handleCitySelect = useCallback((c) => {
    setCity(c)
  }, [])

  return (
    <div className="app" style={{ background: `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` }}>
      <header className="app-header">
        <CitySelector current={city.name} onSelect={handleCitySelect} />
      </header>

      <main className="app-main">
        {loading && (
          <div className="state-message">
            <div className="spinner" />
            <p>Obteniendo datos del clima...</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8" opacity="0.6"/>
              <line x1="12" y1="7.5" x2="12" y2="12" strokeWidth="2"/>
              <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            <p>{error}</p>
            <button className="retry-btn" onClick={refetch}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <CurrentWeather data={current} daily={daily} />
            <HourlyForecast hourly={hourly} />
            <Forecast daily={daily} />
            <MoonPhase />
          </>
        )}
      </main>

      <footer className="app-footer">
        <span>Open-Meteo</span>
        <span className="dot">·</span>
        <span>Panamá 🇵🇦</span>
      </footer>
    </div>
  )
}

export default App
