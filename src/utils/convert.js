export const UNIT_OPTIONS = {
  temp: [
    { id: 'C', label: '°C', to: (v) => v },
    { id: 'F', label: '°F', to: (v) => Math.round(v * 9 / 5 + 32) },
  ],
  wind: [
    { id: 'kmh', label: 'km/h', to: (v) => v },
    { id: 'mph', label: 'mph', to: (v) => Math.round(v * 0.621371) },
    { id: 'ms', label: 'm/s', to: (v) => Math.round(v / 3.6 * 10) / 10 },
    { id: 'knots', label: 'knots', to: (v) => Math.round(v * 0.539957) },
  ],
  pressure: [
    { id: 'hPa', label: 'hPa', to: (v) => Math.round(v) },
    { id: 'inHg', label: 'inHg', to: (v) => (v * 0.02953).toFixed(2) },
    { id: 'mmHg', label: 'mmHg', to: (v) => Math.round(v * 0.75006) },
  ],
  precip: [
    { id: 'mm', label: 'mm', to: (v) => v },
    { id: 'cm', label: 'cm', to: (v) => (v / 10).toFixed(1) },
    { id: 'in', label: 'in', to: (v) => (v / 25.4).toFixed(2) },
  ],
}

export function convert(value, unitGroup, unitId) {
  if (value == null || !unitGroup || !unitId) return value
  const group = UNIT_OPTIONS[unitGroup]
  if (!group) return value
  const opt = group.find((u) => u.id === unitId)
  if (!opt) return value
  return opt.to(value)
}

export function convertLabel(unitGroup, unitId) {
  if (!unitGroup || !unitId) return ''
  const group = UNIT_OPTIONS[unitGroup]
  if (!group) return ''
  const opt = group.find((u) => u.id === unitId)
  return opt?.label || ''
}
