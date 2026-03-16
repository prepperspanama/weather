import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'weather_notif_prefs'

function loadPrefs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { alerts: true, precip: false }
}

export default function useNotifications(alerts) {
  const [permission, setPermission] = useState(Notification?.permission || 'default')
  const [prefs, setPrefs] = useState(loadPrefs)
  const [notifiedIds, setNotifiedIds] = useState(new Set())

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch {}
  }, [prefs])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return
    const result = await Notification.requestPermission()
    setPermission(result)
  }, [])

  const togglePref = useCallback((key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  useEffect(() => {
    if (!alerts || alerts.length === 0 || permission !== 'granted') return
    if (!prefs.alerts) return

    const alert = alerts[0]
    const alertId = alert.headline || alert.event || alert.description?.slice(0, 50)
    if (!alertId || notifiedIds.has(alertId)) return

    setNotifiedIds((prev) => new Set([...prev, alertId]))
    try {
      const n = new Notification('⚠️ Alerta meteorológica', {
        body: alert.headline || alert.event || alert.description?.slice(0, 120),
        tag: 'weather-alert',
        requireInteraction: true,
        icon: '/icons/icon-512.svg',
      })
      n.onclick = () => window.focus()
    } catch {}

    try { navigator.setAppBadge?.(alerts.length) } catch {}
  }, [alerts, permission, prefs.alerts, notifiedIds])

  useEffect(() => {
    if (!alerts || alerts.length === 0) {
      try { navigator.clearAppBadge?.() } catch {}
    }
  }, [alerts])

  return { permission, prefs, requestPermission, togglePref }
}
