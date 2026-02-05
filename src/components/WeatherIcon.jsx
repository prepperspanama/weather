const icons = {
  sun: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <circle cx="32" cy="32" r="12" fill="#fbbf24" />
      {[0,45,90,135,180,225,270,315].map((a) => (
        <line key={a} x1="32" y1="6" x2="32" y2="14"
          stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"
          transform={`rotate(${a} 32 32)`} />
      ))}
    </svg>
  ),
  'cloud-sun': (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <circle cx="24" cy="22" r="9" fill="#fbbf24" />
      {[0,60,120,180,240,300].map((a) => (
        <line key={a} x1="24" y1="8" x2="24" y2="13"
          stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${a} 24 22)`} />
      ))}
      <path d="M20 42c-6 0-10-4-10-9s4-9 9-9c1 0 2 0 3 1 2-4 6-6 11-6 6 0 11 4 12 10 4 1 7 4 7 8 0 5-4 9-9 9H20z" fill="#94a3b8" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 48c-8 0-14-6-14-13s6-13 13-13c2 0 3 0 5 1 2-6 8-9 15-9 9 0 16 6 17 14 5 1 9 6 9 11 0 7-6 13-13 13H18z" fill="#94a3b8" />
    </svg>
  ),
  fog: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <line x1="10" y1="24" x2="54" y2="24" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="14" y1="32" x2="50" y2="32" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="10" y1="40" x2="54" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  drizzle: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 40c-6 0-10-5-10-10s5-10 10-10c1 0 3 0 4 1 2-4 7-7 12-7 8 0 14 5 15 12 4 1 7 4 7 9 0 6-4 10-10 10H18z" fill="#94a3b8" />
      <line x1="22" y1="48" x2="20" y2="56" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="48" x2="30" y2="56" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="48" x2="40" y2="56" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  rain: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 36c-6 0-10-5-10-10s5-10 10-10c1 0 3 0 4 1 2-4 7-7 12-7 8 0 14 5 15 12 4 1 7 4 7 9 0 6-4 10-10 10H18z" fill="#64748b" />
      <line x1="18" y1="46" x2="14" y2="56" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="46" x2="24" y2="56" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="46" x2="34" y2="56" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="46" x2="44" y2="56" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  'rain-heavy': (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 34c-6 0-10-5-10-10s5-10 10-10c1 0 3 0 4 1 2-4 7-7 12-7 8 0 14 5 15 12 4 1 7 4 7 9 0 6-4 10-10 10H18z" fill="#475569" />
      <line x1="14" y1="44" x2="8" y2="58" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="44" x2="18" y2="58" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="34" y1="44" x2="28" y2="58" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="44" x2="38" y2="58" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="44" x2="48" y2="58" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  snow: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 36c-6 0-10-5-10-10s5-10 10-10c1 0 3 0 4 1 2-4 7-7 12-7 8 0 14 5 15 12 4 1 7 4 7 9 0 6-4 10-10 10H18z" fill="#94a3b8" />
      <circle cx="16" cy="48" r="2.5" fill="#93c5fd" />
      <circle cx="24" cy="52" r="2.5" fill="#93c5fd" />
      <circle cx="32" cy="48" r="2.5" fill="#93c5fd" />
      <circle cx="40" cy="52" r="2.5" fill="#93c5fd" />
      <circle cx="48" cy="48" r="2.5" fill="#93c5fd" />
    </svg>
  ),
  thunderstorm: (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <path d="M18 30c-6 0-10-5-10-10s5-10 10-10c1 0 3 0 4 1 2-4 7-7 12-7 8 0 14 5 15 12 4 1 7 4 7 9 0 6-4 10-10 10H18z" fill="#64748b" />
      <polygon points="34,38 28,48 34,48 30,58" fill="#fbbf24" />
      <line x1="18" y1="40" x2="14" y2="50" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="40" x2="42" y2="50" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

export default function WeatherIcon({ code, size = 48 }) {
  const info = {
    0: 'sun', 1: 'sun', 2: 'cloud-sun', 3: 'cloud',
    45: 'fog', 48: 'fog',
    51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
    56: 'snow', 57: 'snow',
    61: 'rain', 63: 'rain', 65: 'rain-heavy',
    66: 'snow', 67: 'snow',
    71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
    80: 'rain', 81: 'rain', 82: 'rain-heavy',
    85: 'snow', 86: 'snow',
    95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm',
  }

  const name = info[code] || 'cloud'
  return <span style={{ width: size, height: size, display: 'inline-flex' }}>{icons[name]}</span>
}
