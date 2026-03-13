export default function NotificationSettings({ permission, prefs, requestPermission, togglePref, onClose }) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <span className="settings-title">Notificaciones</span>
          <button className="settings-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {permission !== 'granted' && (
          <div className="settings-row">
            <span className="settings-row-label">Permiso de notificaciones</span>
            <button className="settings-action-btn" onClick={requestPermission}>
              {permission === 'denied' ? 'Denegado' : 'Activar'}
            </button>
          </div>
        )}

        {permission === 'granted' && (
          <>
            <div className="settings-row">
              <span className="settings-row-label">Alertas meteorológicas</span>
              <button
                className={`settings-toggle ${prefs.alerts ? 'active' : ''}`}
                onClick={() => togglePref('alerts')}
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
            <div className="settings-row">
              <span className="settings-row-label">Precipitación próxima</span>
              <button
                className={`settings-toggle ${prefs.precip ? 'active' : ''}`}
                onClick={() => togglePref('precip')}
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
          </>
        )}

        <p className="settings-footnote">
          Las notificaciones te mantendrán informado sobre alertas severas y cambios importantes en el clima.
        </p>
      </div>
    </div>
  )
}
