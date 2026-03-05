import { UNIT_OPTIONS } from '../utils/convert'

const labels = { temp: 'Temperatura', wind: 'Viento', pressure: 'Presión', precip: 'Precipitación' }

export default function UnitSettings({ units, setUnit, onClose }) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <span className="settings-title">Unidades</span>
          <button className="settings-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {Object.entries(labels).map(([key, label]) => (
          <div key={key} className="settings-row">
            <span className="settings-row-label">{label}</span>
            <div className="settings-row-options">
              {UNIT_OPTIONS[key].map((opt) => (
                <button
                  key={opt.id}
                  className={`settings-option ${units[key] === opt.id ? 'active' : ''}`}
                  onClick={() => setUnit(key, opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
