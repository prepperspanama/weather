import { useRef, useEffect } from 'react'

const RAIN = { count: 120, speed: 6, length: 15, color: 'rgba(180,200,255,0.15)' }
const SNOW = { count: 80, speed: 1.5, size: 2, color: 'rgba(255,255,255,0.4)' }

export default function AnimatedBackground({ weatherCode, isDay }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let stopped = false

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const state = { particles: [], flash: 0, time: 0 }
    stateRef.current = state

    const isRain = weatherCode >= 51 && weatherCode <= 67
    const isSnow = weatherCode >= 71 && weatherCode <= 77
    const isThunder = weatherCode >= 95
    const isNight = !isDay
    const isFog = weatherCode === 45 || weatherCode === 48

    if (isRain || isSnow) {
      const cfg = isRain ? RAIN : SNOW
      for (let i = 0; i < cfg.count; i++) {
        state.particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1,
          speed: cfg.speed + Math.random() * 2,
          len: cfg.length || 0,
          size: cfg.size || 0,
          opacity: 0.3 + Math.random() * 0.7,
        })
      }
    }

    if (isNight) {
      for (let i = 0; i < 60; i++) {
        state.particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinklePhase: Math.random() * Math.PI * 2,
          isStar: true,
        })
      }
    }

    function animate() {
      if (stopped) return
      state.time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of state.particles) {
        if (p.isStar) {
          const alpha = p.opacity * (0.5 + 0.5 * Math.sin(state.time * p.twinkleSpeed + p.twinklePhase))
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (isRain) {
          p.y += p.speed
          if (p.y > canvas.height) { p.y = -p.len; p.x = Math.random() * canvas.width }
          ctx.strokeStyle = RAIN.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - 2, p.y + p.len)
          ctx.stroke()
        } else if (isSnow) {
          p.y += p.speed
          p.x += Math.sin(state.time + p.y * 0.02) * 0.5
          if (p.y > canvas.height) { p.y = -5; p.x = Math.random() * canvas.width }
          ctx.fillStyle = SNOW.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (isFog) {
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height, 0,
          canvas.width / 2, canvas.height, canvas.height * 0.8
        )
        grad.addColorStop(0, 'rgba(180,190,200,0.04)')
        grad.addColorStop(0.5, 'rgba(180,190,200,0.02)')
        grad.addColorStop(1, 'rgba(180,190,200,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (isThunder) {
        state.flash -= 0.02
        if (state.flash < 0) state.flash = 0
        if (Math.random() < 0.005) state.flash = 1
        if (state.flash > 0) {
          ctx.fillStyle = `rgba(255,255,255,${state.flash * 0.3})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      stopped = true
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [weatherCode, isDay])

  return <canvas ref={canvasRef} className="animated-bg" />
}
