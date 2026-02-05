import { useState, useRef, useEffect } from 'react'
import { panamaCities } from '../utils/weatherCodes'

export default function CitySelector({ current, onSelect }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
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

  return (
    <div className="city-selector" ref={ref}>
      <button className="city-selector-btn" onClick={() => setOpen(!open)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        {current}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${open ? 'open' : ''}`}>
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
            {filtered.map((c) => (
              <button
                key={c.name}
                className={`city-option ${c.name === current ? 'active' : ''}`}
                onClick={() => { onSelect(c); setOpen(false); setQuery('') }}
              >
                {c.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <span className="city-no-results">Sin resultados</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
