import { useState, useEffect, useCallback, useRef } from 'react'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const REFETCH_INTERVAL = 30 * 60 * 1000

export function useWeather(lat, lon) {
  const [current, setCurrent] = useState(null)
  const [daily, setDaily] = useState(null)
  const [hourly, setHourly] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  const fetchWeather = useCallback(async () => {
    if (lat == null || lon == null) return
    setError(null)
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index,cloud_cover,visibility,is_day',
        hourly: 'temperature_2m,precipitation_probability,weather_code,uv_index,wind_speed_10m,wind_direction_10m,relative_humidity_2m,apparent_temperature,surface_pressure,visibility,precipitation,cloud_cover',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,uv_index_max,precipitation_hours,daylight_duration,sunshine_duration',
        timezone: 'America/Panama',
        forecast_days: 10,
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

  const fetchAirQuality = useCallback(async () => {
    if (lat == null || lon == null) return
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'european_aqi,us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide',
        hourly: 'european_aqi,us_aqi,pm2_5,pm10',
      })
      const res = await fetch(`${AIR_QUALITY_URL}?${params}`)
      if (!res.ok) return
      const data = await res.json()
      setAirQuality(data)
    } catch {
      // silencioso — no crítico si falla
    }
  }, [lat, lon])

  useEffect(() => {
    setLoading(true)
    fetchWeather()
    fetchAirQuality()

    intervalRef.current = setInterval(() => {
      fetchWeather()
      fetchAirQuality()
    }, REFETCH_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchWeather, fetchAirQuality])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchWeather()
    fetchAirQuality()
  }, [fetchWeather, fetchAirQuality])

  return { current, daily, hourly, airQuality, loading, error, refetch }
}
