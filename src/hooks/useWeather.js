import { useState, useEffect, useCallback } from 'react'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export function useWeather(lat, lon) {
  const [current, setCurrent] = useState(null)
  const [daily, setDaily] = useState(null)
  const [hourly, setHourly] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retry, setRetry] = useState(0)

  const fetchWeather = useCallback(async () => {
    if (lat == null || lon == null) return
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index,cloud_cover,is_day',
        hourly: 'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max',
        timezone: 'America/Panama',
        forecast_days: 7,
      })
      const res = await fetch(`${BASE_URL}?${params}`)
      if (!res.ok) throw new Error('Error al obtener datos del clima')
      const data = await res.json()
      setCurrent(data.current)
      setDaily(data.daily)
      setHourly(data.hourly)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [lat, lon])

  useEffect(() => {
    const timer = setTimeout(fetchWeather, 0)
    return () => clearTimeout(timer)
  }, [fetchWeather, retry])

  const refetch = useCallback(() => setRetry((n) => n + 1), [])

  return { current, daily, hourly, loading, error, refetch }
}
