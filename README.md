# Clima Panamá 🇵🇦

Progressive Web App del clima y pronóstico para ciudades de Panamá.

## Tecnologías

- **React 19** + Vite 8
- **PWA** con `vite-plugin-pwa` (service worker, offline support)
- **Open-Meteo API** (gratis, sin API key)
- GitHub Actions para build + deploy a Pages

## Desarrollo

```bash
bun install
bun dev        # servidor local
bun run build  # build producción en dist/
```

## Deploy

El push a `main` dispara el workflow de GitHub Actions que construye y despliega a GitHub Pages. También se puede ejecutar manualmente desde Actions > Deploy to GitHub Pages > Run workflow.

Habilitar Settings > Pages > Source: **GitHub Actions**.

## Datos

12 ciudades panameñas con clima actual y pronóstico de 7 días vía [Open-Meteo](https://open-meteo.com/).
