import { useState, useCallback } from 'react'
import { panamaCities } from './utils/weatherCodes'
import { useWeather } from './hooks/useWeather'
import CitySelector from './components/CitySelector'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import './App.css'

function App() {
  const [city, setCity] = useState(panamaCities[0])
  const { current, daily, loading, error, refetch } = useWeather(city.lat, city.lon)

  const handleCitySelect = useCallback((c) => {
    setCity(c)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            Clima Panamá
          </h1>
          <CitySelector current={city.name} onSelect={handleCitySelect} />
        </div>
        <p className="app-subtitle">Clima y pronóstico del tiempo en Panamá</p>
      </header>

      <main className="app-main">
        {loading && (
          <div className="state-message">
            <div className="spinner" />
            <p>Cargando datos del clima...</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{error}</p>
            <button className="retry-btn" onClick={refetch}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <CurrentWeather data={current} />
            <Forecast daily={daily} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Datos: Open-Meteo &bull; Hecho en 🇵🇦 Panamá</p>
      </footer>
    </div>
  )
}

export default App
