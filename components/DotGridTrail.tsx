'use client'

import { useEffect, useRef } from 'react'

export default function DotGridTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseX = -999
    let mouseY = -999
    let animationId: number

    const SPACING = 28
    const BASE_RADIUS = 1.5
    const MAX_RADIUS = 4.5
    const INFLUENCE_RADIUS = 90
    const BASE_OPACITY = 0.12
    const MAX_OPACITY = 0.4

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      const cols = Math.ceil(canvas!.width / SPACING) + 1
      const rows = Math.ceil(canvas!.height / SPACING) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING
          const y = j * SPACING

          const dx = x - mouseX
          const dy = y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS)
          const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * influence
          const opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * influence

          ctx!.beginPath()
          ctx!.arc(x, y, radius, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(0, 0, 0, ${opacity})`
          ctx!.fill()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  )
}
