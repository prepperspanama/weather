import { useState, useRef, useEffect } from 'react'
import { panamaCities } from '../utils/weatherCodes'

const GPS_CITY = { name: 'Mi ubicación', lat: null, lon: null, isGps: true }

export default function CitySelector({ current, onSelect }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [locating, setLocating] = useState(false)
  const [gpsError, setGpsError] = useState(null)
  const ref = useRef(null)

  const filtered = panamaCities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleGps() {
    if (!navigator.geolocation) {
      setGpsError('GPS no disponible en este dispositivo')
      return
    }
    setLocating(true)
    setGpsError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSelect({ name: 'Mi ubicación', lat: pos.coords.latitude, lon: pos.coords.longitude, isGps: true })
        setOpen(false)
        setQuery('')
        setLocating(false)
      },
      (err) => {
        const messages = {
          1: 'Permiso de ubicación denegado',
          2: 'Ubicación no disponible',
          3: 'Tiempo de espera agotado',
        }
        setGpsError(messages[err.code] || 'Error al obtener ubicación')
        setLocating(false)
      },
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }

  return (
    <div className="city-selector" ref={ref}>
      <button className="city-selector-btn" onClick={() => setOpen(!open)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/>
          <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none"/>
        </svg>
        {current}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${open ? 'open' : ''}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="city-dropdown">
          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="city-search"
          />
          <div className="city-list">
            {!query && (
              <button
                className={`city-option gps-option ${current === GPS_CITY.name ? 'active' : ''}`}
                onClick={handleGps}
                disabled={locating}
              >
                {locating ? 'Obteniendo ubicación...' : '📍 Mi ubicación'}
              </button>
            )}
            {gpsError && (
              <span className="city-no-results gps-error">{gpsError}</span>
            )}
            {filtered.map((c) => (
              <button
                key={c.name}
                className={`city-option ${c.name === current ? 'active' : ''}`}
                onClick={() => { onSelect(c); setOpen(false); setQuery('') }}
              >
                {c.name}
              </button>
            ))}
            {filtered.length === 0 && query && (
              <span className="city-no-results">Sin resultados</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
