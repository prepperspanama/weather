# Clima Panamá 🇵🇦

Progressive Web App del clima y pronóstico para más de 80 ciudades de Panamá.

## Funcionalidades

- Clima actual con íconos dinámicos según código WMO
- Pronóstico por hora (próximas 48 h) y 7 días
- Mapa de ubicación interactivo (Leaflet)
- Calidad del aire (Open-Meteo Air Quality API)
- Fase lunar actual
- Alertas meteorológicas severas con notificaciones push
- Pull-to-refresh para recargar datos
- Navegación entre ciudades favoritas
- Alternancia de unidades (°C/°F, km/h/mph, hPa/inHg, mm/in)
- Fondo animado adaptado al clima y hora del día
- Soporte offline (PWA con service worker)
- Skeleton loading

## Tecnologías

- **React 19** + Vite 8
- **Leaflet** — mapas interactivos
- **@meteocons/svg-static** — iconos meteorológicos
- **PWA** con `vite-plugin-pwa` (service worker, offline support)
- **Open-Meteo API** (gratis, sin API key)
- GitHub Actions — build + deploy a Pages

## Desarrollo

```bash
bun install
bun dev         # servidor local
bun run build   # build producción en dist/
bun run preview # previsualizar build local
bun run lint    # ejecutar ESLint
```

## Deploy

El push a `main` dispara el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) que construye y despliega a GitHub Pages. También se puede ejecutar manualmente desde Actions > Deploy to GitHub Pages > Run workflow.

Habilitar Settings > Pages > Source: **GitHub Actions**.

## Datos

Más de 80 ciudades panameñas de todas las provincias con clima actual y pronóstico de 7 días vía [Open-Meteo](https://open-meteo.com/).

## Licencia

GNU General Public License v3.0 — ver [LICENSE](LICENSE).
