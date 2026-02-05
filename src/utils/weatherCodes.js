const weatherCodes = {
  0: { description: 'Cielo despejado', icon: 'sun' },
  1: { description: 'Mayormente despejado', icon: 'sun' },
  2: { description: 'Parcialmente nublado', icon: 'cloud-sun' },
  3: { description: 'Nublado', icon: 'cloud' },
  45: { description: 'Niebla', icon: 'fog' },
  48: { description: 'Niebla con escarcha', icon: 'fog' },
  51: { description: 'Llovizna ligera', icon: 'drizzle' },
  53: { description: 'Llovizna moderada', icon: 'drizzle' },
  55: { description: 'Llovizna densa', icon: 'drizzle' },
  56: { description: 'Llovizna helada ligera', icon: 'snow' },
  57: { description: 'Llovizna helada densa', icon: 'snow' },
  61: { description: 'Lluvia ligera', icon: 'rain' },
  63: { description: 'Lluvia moderada', icon: 'rain' },
  65: { description: 'Lluvia intensa', icon: 'rain-heavy' },
  66: { description: 'Lluvia helada ligera', icon: 'snow' },
  67: { description: 'Lluvia helada intensa', icon: 'snow' },
  71: { description: 'Nevada ligera', icon: 'snow' },
  73: { description: 'Nevada moderada', icon: 'snow' },
  75: { description: 'Nevada intensa', icon: 'snow' },
  77: { description: 'Granos de nieve', icon: 'snow' },
  80: { description: 'Chubascos ligeros', icon: 'rain' },
  81: { description: 'Chubascos moderados', icon: 'rain' },
  82: { description: 'Chubascos violentos', icon: 'rain-heavy' },
  85: { description: 'Chubascos de nieve ligeros', icon: 'snow' },
  86: { description: 'Chubascos de nieve intensos', icon: 'snow' },
  95: { description: 'Tormenta eléctrica', icon: 'thunderstorm' },
  96: { description: 'Tormenta con granizo ligero', icon: 'thunderstorm' },
  99: { description: 'Tormenta con granizo intenso', icon: 'thunderstorm' },
}

export function getWeatherInfo(code) {
  return weatherCodes[code] || { description: 'Desconocido', icon: 'cloud' }
}

export const panamaCities = [
  { name: 'Ciudad de Panamá', lat: 8.9824, lon: -79.5199 },
  { name: 'David', lat: 8.4293, lon: -82.4512 },
  { name: 'Colón', lat: 9.3594, lon: -79.9014 },
  { name: 'Santiago', lat: 8.1000, lon: -80.9833 },
  { name: 'Penonomé', lat: 8.5167, lon: -80.3500 },
  { name: 'Chitré', lat: 7.9667, lon: -80.4333 },
  { name: 'Las Tablas', lat: 7.7667, lon: -80.2833 },
  { name: 'Bocas del Toro', lat: 9.3403, lon: -82.2423 },
  { name: 'Boquete', lat: 8.7833, lon: -82.4333 },
  { name: 'El Valle de Antón', lat: 8.6000, lon: -80.1333 },
  { name: 'La Chorrera', lat: 8.8804, lon: -79.7833 },
  { name: 'Aguadulce', lat: 8.2500, lon: -80.5500 },
]
