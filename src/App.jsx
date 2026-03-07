import { useState, useCallback, useMemo, useEffect } from 'react'
import { panamaCities } from './utils/weatherCodes'
import { useWeather } from './hooks/useWeather'
import useUnits from './hooks/useUnits'
import useLocations from './hooks/useLocations'
import CitySelector from './components/CitySelector'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import Forecast from './components/Forecast'
import MoonPhase from './components/MoonPhase'
import AirQuality from './components/AirQuality'
import SevereAlertBanner from './components/SevereAlertBanner'
import LocationMap from './components/LocationMap'
import UnitSettings from './components/UnitSettings'
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
  const [showSettings, setShowSettings] = useState(false)
  const { units, setUnit } = useUnits()
  const loc = useLocations()
  const { current, daily, hourly, airQuality, alerts, loading, error, refetch } = useWeather(city.lat, city.lon)

  const gradient = useMemo(() => {
    if (!current) return ['#0a1628', '#1a2744']
    return getGradient(current.weather_code, current.is_day)
  }, [current])

  const handleCitySelect = useCallback((c) => {
    setCity(c)
    loc.addLocation(c)
  }, [loc])

  useEffect(() => {
    if (loc.current && (loc.current.lat !== city.lat || loc.current.lon !== city.lon)) {
      setCity(loc.current)
    }
  }, [loc.current?.name])

  const isFav = loc.isFavorite(city.name)

  return (
    <div className="app" style={{ background: `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` }}>
      <header className="app-header">
        <div className="header-row">
          {loc.locations.length > 1 && (
            <button className="nav-arrow" onClick={loc.goPrev} aria-label="Anterior">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          )}
          <CitySelector current={city.name} onSelect={handleCitySelect} />
          {loc.locations.length > 1 && (
            <button className="nav-arrow" onClick={loc.goNext} aria-label="Siguiente">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          )}
        </div>
        <div className="header-actions">
          <button
            className={`fav-btn ${isFav ? 'active' : ''}`}
            onClick={() => isFav ? loc.removeLocation(city.name) : loc.addLocation(city)}
            aria-label={isFav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)} aria-label="Unidades">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </header>
      {showSettings && <UnitSettings units={units} setUnit={setUnit} onClose={() => setShowSettings(false)} />}

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
            <SevereAlertBanner alerts={alerts} />
            <CurrentWeather data={current} daily={daily} units={units} />
            <LocationMap lat={city.lat} lon={city.lon} name={city.name} />
            <HourlyForecast hourly={hourly} units={units} />
            <AirQuality data={airQuality} />
            <Forecast daily={daily} units={units} />
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
