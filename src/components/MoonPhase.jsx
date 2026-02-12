import { useMemo } from 'react'
import { getMoonPhase, getMoonName, getMoonIllumination, getMoonPath } from '../utils/moonPhase'

export default function MoonPhase() {
  const { name, illumination, path } = useMemo(() => {
    const p = getMoonPhase(new Date())
    return {
      name: getMoonName(p),
      illumination: getMoonIllumination(p),
      path: getMoonPath(50, 50, 44, p),
    }
  }, [])

  return (
    <div className="moon-card">
      <span className="card-title">FASE LUNAR</span>
      <div className="moon-body">
        <div className="moon-visual">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <path d={path} fill="#fef3c7" opacity="0.95" />
          </svg>
        </div>
        <div className="moon-info">
          <span className="moon-name">{name}</span>
          <span className="moon-illumination">{illumination}% iluminada</span>
        </div>
      </div>
    </div>
  )
}
