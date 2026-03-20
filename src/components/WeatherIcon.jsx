import clearDay from '@meteocons/svg-static/fill/clear-day.svg'
import clearNight from '@meteocons/svg-static/fill/clear-night.svg'
import mostlyClearDay from '@meteocons/svg-static/fill/mostly-clear-day.svg'
import mostlyClearNight from '@meteocons/svg-static/fill/mostly-clear-night.svg'
import partlyCloudyDay from '@meteocons/svg-static/fill/partly-cloudy-day.svg'
import partlyCloudyNight from '@meteocons/svg-static/fill/partly-cloudy-night.svg'
import overcast from '@meteocons/svg-static/fill/overcast.svg'
import fogDay from '@meteocons/svg-static/fill/fog-day.svg'
import fogNight from '@meteocons/svg-static/fill/fog-night.svg'
import drizzle from '@meteocons/svg-static/fill/drizzle.svg'
import overcastRain from '@meteocons/svg-static/fill/overcast-day-rain.svg'
import overcastNightRain from '@meteocons/svg-static/fill/overcast-night-rain.svg'
import extremeRain from '@meteocons/svg-static/fill/extreme-rain.svg'
import overcastSleet from '@meteocons/svg-static/fill/overcast-sleet.svg'
import overcastSnow from '@meteocons/svg-static/fill/overcast-day-snow.svg'
import overcastNightSnow from '@meteocons/svg-static/fill/overcast-night-snow.svg'
import partlyCloudyRain from '@meteocons/svg-static/fill/partly-cloudy-day-rain.svg'
import partlyCloudyNightRain from '@meteocons/svg-static/fill/partly-cloudy-night-rain.svg'
import partlyCloudySnow from '@meteocons/svg-static/fill/partly-cloudy-day-snow.svg'
import partlyCloudyNightSnow from '@meteocons/svg-static/fill/partly-cloudy-night-snow.svg'
import thunderstormsDay from '@meteocons/svg-static/fill/thunderstorms-day.svg'
import thunderstormsNight from '@meteocons/svg-static/fill/thunderstorms-night.svg'

const iconMap = {
  0: { day: clearDay, night: clearNight },
  1: { day: mostlyClearDay, night: mostlyClearNight },
  2: { day: partlyCloudyDay, night: partlyCloudyNight },
  3: { day: overcast, night: overcast },
  45: { day: fogDay, night: fogNight },
  48: { day: fogDay, night: fogNight },
  51: { day: drizzle, night: drizzle },
  53: { day: drizzle, night: drizzle },
  55: { day: drizzle, night: drizzle },
  56: { day: overcastSleet, night: overcastSleet },
  57: { day: overcastSleet, night: overcastSleet },
  61: { day: overcastRain, night: overcastNightRain },
  63: { day: overcastRain, night: overcastNightRain },
  65: { day: extremeRain, night: extremeRain },
  66: { day: overcastSleet, night: overcastSleet },
  67: { day: overcastSleet, night: overcastSleet },
  71: { day: overcastSnow, night: overcastNightSnow },
  73: { day: overcastSnow, night: overcastNightSnow },
  75: { day: overcastSnow, night: overcastNightSnow },
  77: { day: overcastSnow, night: overcastNightSnow },
  80: { day: partlyCloudyRain, night: partlyCloudyNightRain },
  81: { day: partlyCloudyRain, night: partlyCloudyNightRain },
  82: { day: extremeRain, night: extremeRain },
  85: { day: partlyCloudySnow, night: partlyCloudyNightSnow },
  86: { day: partlyCloudySnow, night: partlyCloudyNightSnow },
  95: { day: thunderstormsDay, night: thunderstormsNight },
  96: { day: thunderstormsDay, night: thunderstormsNight },
  99: { day: thunderstormsDay, night: thunderstormsNight },
}

const descriptions = {
  0: 'despejado', 1: 'mayormente despejado', 2: 'parcialmente nublado',
  3: 'nublado', 45: 'niebla', 48: 'niebla',
  51: 'llovizna', 53: 'llovizna', 55: 'llovizna',
  56: 'llovizna helada', 57: 'llovizna helada',
  61: 'lluvia ligera', 63: 'lluvia', 65: 'lluvia intensa',
  66: 'lluvia helada', 67: 'lluvia helada',
  71: 'nieve ligera', 73: 'nieve', 75: 'nieve intensa', 77: 'granos de nieve',
  80: 'chubascos', 81: 'chubascos', 82: 'chubascos fuertes',
  85: 'chubascos de nieve', 86: 'chubascos de nieve',
  95: 'tormenta', 96: 'tormenta con granizo', 99: 'tormenta intensa',
}

export default function WeatherIcon({ code, isDay = true, size = 24 }) {
  const entry = iconMap[code] || iconMap[2]
  const src = isDay ? entry.day : entry.night
  const period = isDay ? 'día' : 'noche'
  const desc = descriptions[code] || 'clima'

  return (
    <img
      src={src}
      alt={`${desc} - ${period}`}
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}
