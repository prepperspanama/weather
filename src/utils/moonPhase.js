export function getMoonPhase(date) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  let jy = y
  let jm = m
  if (jm <= 2) { jy--; jm += 12 }
  const a = Math.floor(jy / 100)
  const b = 2 - a + Math.floor(a / 4)
  const jd = Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + d + b - 1524.5

  const daysSince = jd - 2451549.5
  const phase = ((daysSince / 29.53058867) % 1 + 1) % 1
  return phase
}

export function getMoonName(phase) {
  if (phase < 0.03 || phase > 0.97) return 'Luna nueva'
  if (phase < 0.22) return 'Luna creciente'
  if (phase < 0.28) return 'Cuarto creciente'
  if (phase < 0.47) return 'Luna gibosa creciente'
  if (phase < 0.53) return 'Luna llena'
  if (phase < 0.72) return 'Luna gibosa menguante'
  if (phase < 0.78) return 'Cuarto menguante'
  return 'Luna menguante'
}

export function getMoonIllumination(phase) {
  return Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100)
}

export function getMoonPath(cx, cy, r, phase) {
  if (phase === 0.5 || (phase > 0.48 && phase < 0.52)) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r} ${r} 0 1 0 ${cx} ${cy - r} Z`
  }

  const theta = phase * 2 * Math.PI
  const rx = Math.abs(Math.sin(theta)) * r

  if (rx < 0.5) {
    if (phase < 0.5) {
      return `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} L ${cx} ${cy - r} Z`
    }
    return `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} L ${cx} ${cy - r} Z`
  }

  const outerSweep = phase < 0.5 ? 1 : 0
  const termSweep = phase < 0.5 ? 0 : 1

  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r}`,
    'Z',
  ].join(' ')
}
