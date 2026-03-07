import { useState, useCallback } from 'react'

const STORAGE_KEY = 'weather_locations'

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return []
}

export default function useLocations() {
  const [locations, setLocations] = useState(load)
  const [currentIdx, setCurrentIdx] = useState(0)

  const save = useCallback((list) => {
    setLocations(list)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch {}
  }, [])

  const addLocation = useCallback((city) => {
    setLocations((prev) => {
      if (prev.some((l) => l.name === city.name)) return prev
      const next = [...prev, city]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const removeLocation = useCallback((name) => {
    setLocations((prev) => {
      const next = prev.filter((l) => l.name !== name)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const goNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % locations.length)
  }, [locations.length])

  const goPrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + locations.length) % locations.length)
  }, [locations.length])

  const goTo = useCallback((idx) => {
    setCurrentIdx(idx)
  }, [])

  const isFavorite = useCallback((name) => {
    return locations.some((l) => l.name === name)
  }, [locations])

  return {
    locations, currentIdx,
    current: locations[currentIdx] || null,
    addLocation, removeLocation,
    goNext, goPrev, goTo,
    isFavorite,
  }
}
