const s24 = { viewBox: '0 0 24 24', width: 24, height: 24 }

const iconDefs = {
  sun: (
    <svg {...s24} fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" fill="#fbbf24" stroke="none" />
      <circle cx="12" cy="12" r="5.5" strokeWidth="1.2" opacity="0.3" />
      {[0,45,90,135,180,225,270,315].map((a) => (
        <line key={a} x1="12" y1="2" x2="12" y2="5" transform={`rotate(${a} 12 12)`} strokeWidth="1.8" />
      ))}
    </svg>
  ),
  'cloud-sun': (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="4" fill="#fbbf24" stroke="none" />
      {[0,72,144,216,288].map((a) => (
        <line key={a} x1="10" y1="2.5" x2="10" y2="4.5" stroke="#fbbf24" strokeWidth="1.5" transform={`rotate(${a} 10 8)`} />
      ))}
      <path d="M6.5 20a6 6 0 0 1-4.2-10.3A5 5 0 0 1 11 7.5a5.5 5.5 0 0 1 7.3 4.5 4 4 0 0 1-2.8 6.8H7Z" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M6.5 19.5a5.5 5.5 0 0 1-3.8-9.5A4.5 4.5 0 0 1 10.5 7a5 5 0 0 1 6.7 4.2 3.5 3.5 0 0 1-2.2 6.3H7Z" fill="rgba(148,163,184,0.5)" stroke="none" />
    </svg>
  ),
  cloud: (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20a5.5 5.5 0 0 1-3.8-9.6 4.5 4.5 0 0 1 8-3 5 5 0 0 1 6.7 4 3.5 3.5 0 0 1-1.9 6.6H7Z" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M6.5 19.5a5 5 0 0 1-3.5-8.7 4 4 0 0 1 7.3-2.8 4.5 4.5 0 0 1 6 3.6 3 3 0 0 1-1.3 5.9H7Z" fill="rgba(148,163,184,0.45)" stroke="none" />
    </svg>
  ),
  fog: (
    <svg {...s24} fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="8" x2="20" y2="8" strokeWidth="2.5" opacity="0.9" />
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" opacity="0.8" />
      <line x1="4" y1="16" x2="20" y2="16" strokeWidth="2.5" opacity="0.85" />
      <line x1="7" y1="20" x2="17" y2="20" strokeWidth="2" opacity="0.5" />
    </svg>
  ),
  drizzle: (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 17a4.5 4.5 0 0 1-3-8 4 4 0 0 1 7.2-2.5 4.5 4.5 0 0 1 6 3.2 3 3 0 0 1-1.2 5.3H7Z" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="8.5" y1="20" x2="7.5" y2="23" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7" />
      <line x1="13" y1="20.5" x2="12" y2="23.5" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
      <line x1="17" y1="20" x2="16" y2="23" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7" />
    </svg>
  ),
  rain: (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16.5a4.5 4.5 0 0 1-3-7.8 4 4 0 0 1 7.2-2.5 4.5 4.5 0 0 1 6 3.2 3 3 0 0 1-1.2 5.1H7Z" fill="rgba(100,116,139,0.35)" stroke="#64748b" strokeWidth="1.2" />
      <line x1="8" y1="19.5" x2="6.5" y2="23.5" stroke="#3b82f6" strokeWidth="1.8" opacity="0.8" />
      <line x1="12.5" y1="20" x2="11" y2="24" stroke="#3b82f6" strokeWidth="1.8" opacity="0.75" />
      <line x1="17" y1="19.5" x2="15.5" y2="23.5" stroke="#3b82f6" strokeWidth="1.8" opacity="0.8" />
      <line x1="20.5" y1="18.5" x2="19" y2="22.5" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
    </svg>
  ),
  'rain-heavy': (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15.5a4.5 4.5 0 0 1-3-7.8 4 4 0 0 1 7.2-2.5 4.5 4.5 0 0 1 6 3.2 3 3 0 0 1-1.2 5.1H7Z" fill="rgba(71,85,105,0.4)" stroke="#475569" strokeWidth="1.2" />
      <line x1="6.5" y1="18.5" x2="4" y2="24" stroke="#2563eb" strokeWidth="2" opacity="0.85" />
      <line x1="10.5" y1="19" x2="8" y2="24.5" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
      <line x1="14.5" y1="18.5" x2="12" y2="24" stroke="#2563eb" strokeWidth="2" opacity="0.85" />
      <line x1="18.5" y1="18" x2="16" y2="23.5" stroke="#2563eb" strokeWidth="2" opacity="0.75" />
      <line x1="22" y1="17" x2="20" y2="21.5" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  snow: (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16.5a4.5 4.5 0 0 1-3-7.8 4 4 0 0 1 7.2-2.5 4.5 4.5 0 0 1 6 3.2 3 3 0 0 1-1.2 5.1H7Z" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" strokeWidth="1.2" />
      {[[8,20],[12,22],[16,20],[10,23],[14,23]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y}) scale(0.9)`}>
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#93c5fd" strokeWidth="1.2" />
          <line x1="-2.6" y1="-1.5" x2="2.6" y2="1.5" stroke="#93c5fd" strokeWidth="1.2" />
          <line x1="-2.6" y1="1.5" x2="2.6" y2="-1.5" stroke="#93c5fd" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  ),
  thunderstorm: (
    <svg {...s24} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14.5a4.5 4.5 0 0 1-3-7.8 4 4 0 0 1 7.2-2.5 4.5 4.5 0 0 1 6 3.2 3 3 0 0 1-1.2 5.1H7Z" fill="rgba(100,116,139,0.35)" stroke="#64748b" strokeWidth="1.2" />
      <polygon points="15,16 12,21 14.5,21 13,26" fill="#fbbf24" stroke="none" />
      <line x1="6.5" y1="18" x2="5" y2="22" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
      <line x1="9.5" y1="17.5" x2="8.5" y2="20.5" stroke="#3b82f6" strokeWidth="1.2" opacity="0.5" />
    </svg>
  ),
}

export default function WeatherIcon({ code, size = 24 }) {
  const map = {
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
  const name = map[code] || 'cloud'
  return <span style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{iconDefs[name]}</span>
}
