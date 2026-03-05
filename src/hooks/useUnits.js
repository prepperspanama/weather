import { useState, useCallback } from 'react'

const STORAGE_KEY = 'weather_units'

const defaults = { temp: 'C', wind: 'kmh', pressure: 'hPa', precip: 'mm' }

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaults, ...JSON.parse(saved) }
  } catch {}
  return { ...defaults }
}

export default function useUnits() {
  const [units, setUnits] = useState(load)

  const setUnit = useCallback((key, value) => {
    setUnits((prev) => {
      const next = { ...prev, [key]: value }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return { units, setUnit }
}
