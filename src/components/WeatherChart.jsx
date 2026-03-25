import { useRef, useState, useCallback } from 'react'

export default function WeatherChart({ data, labels, unit = '', height = 100, color = 'rgba(255,255,255,0.3)' }) {
  const [hoverIdx, setHoverIdx] = useState(null)
  const ref = useRef(null)

  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = data.length * 28
  const stepX = w / (data.length - 1)
  const pad = 4
  const chartH = height - pad * 2

  const points = data.map((v, i) => {
    const x = i * stepX
    const y = chartH - ((v - min) / range) * chartH + pad
    return { x, y, v, label: labels?.[i] }
  })

  const area = points.map((p, i) => {
    const cmd = i === 0 ? 'M' : 'L'
    return `${cmd}${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }).join(' ')
  const areaClose = ` ${area} L${points[points.length - 1].x.toFixed(1)},${(chartH + pad).toFixed(1)} L${points[0].x.toFixed(1)},${(chartH + pad).toFixed(1)} Z`

  const handlePointer = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = x / rect.width
    const idx = Math.round(ratio * (data.length - 1))
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }, [data.length])

  const handleLeave = useCallback(() => setHoverIdx(null), [])

  const showHover = hoverIdx != null && points[hoverIdx]

  return (
    <div className="weather-chart">
      <div className="weather-chart-inner" ref={ref}>
        <svg
          viewBox={`0 0 ${w} ${height}`}
          className="weather-chart-svg"
          preserveAspectRatio="none"
          onMouseMove={handlePointer}
          onMouseLeave={handleLeave}
          onTouchMove={(e) => { e.preventDefault(); handlePointer(e.changedTouches[0]) }}
          onTouchEnd={handleLeave}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaClose} fill="url(#areaGrad)" />
          <path d={area} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {data.map((v, i) => (
            <circle
              key={i}
              cx={points[i].x}
              cy={points[i].y}
              r="2"
              fill={color}
              opacity="0"
              className="weather-chart-dot"
            />
          ))}

          {showHover && (
            <>
              <line
                x1={points[hoverIdx].x}
                y1={pad}
                x2={points[hoverIdx].x}
                y2={chartH + pad}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <circle
                cx={points[hoverIdx].x}
                cy={points[hoverIdx].y}
                r="5"
                fill={color}
                stroke="#fff"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {showHover && (
          <div
            className="weather-chart-tooltip"
            style={{
              left: `${(points[hoverIdx].x / w) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="weather-chart-tooltip-val">
              {data[hoverIdx]}{unit}
            </span>
            {labels?.[hoverIdx] && (
              <span className="weather-chart-tooltip-label">{labels[hoverIdx]}</span>
            )}
          </div>
        )}

        {points.filter((_, i) => i % Math.max(1, Math.floor(data.length / 6)) === 0 || i === data.length - 1).map((p, i) => (
          <span
            key={i}
            className="weather-chart-xlabel"
            style={{
              left: `${(p.x / w) * 100}%`,
              bottom: '-18px',
            }}
          >
            {p.label || ''}
          </span>
        ))}
      </div>
    </div>
  )
}
