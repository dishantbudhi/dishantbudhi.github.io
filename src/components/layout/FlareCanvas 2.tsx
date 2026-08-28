import { useEffect, useRef } from 'react'

const FLOW_LINES = [-1, 1]

export default function FlareCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const pointer = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTime = performance.now()
    let animationFrame = 0
    let isVisible = true

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(reduceMotion ? 0 : (performance.now() - startTime) / 1000)
    }

    function traceFlowLine(line: number, time: number) {
      const width = window.innerWidth
      const height = window.innerHeight
      const startX = -width * 0.15
      const span = width * 1.3
      const phase = time * 0.14 * line
      const pointerX = (pointer.current.x + 1) * 0.5 * width
      const pointerShift = pointer.current.y * height * 0.075

      context.beginPath()
      for (let step = 0; step <= 96; step += 1) {
        const progress = step / 96
        const x = startX + progress * span
        const arch = Math.sin(progress * Math.PI)
        const baseY = line < 0
          ? height * (0.39 - arch * 0.24)
          : height * (0.61 + arch * 0.24)
        const ripple = Math.sin(progress * Math.PI * 2 + phase) * height * 0.024 * line
        const pointerDistance = (x - pointerX) / (width * 0.28)
        const pointerWarp = pointerShift * Math.exp(-(pointerDistance * pointerDistance))
        const y = baseY + ripple + pointerWarp

        if (step === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
    }

    function createFlowGradient(time: number, index: number, width: number, intensity: number) {
      const gradient = context.createLinearGradient(-width * 0.15, 0, width * 1.15, 0)
      const travel = 0.5 + Math.sin(time * 0.18) * 0.32
      const highlight = index === 0 ? travel : 1 - travel
      const leadingEdge = Math.max(0.02, highlight - 0.3)
      const trailingEdge = Math.min(0.98, highlight + 0.3)

      gradient.addColorStop(0, 'rgba(15, 50, 110, 0)')
      gradient.addColorStop(leadingEdge, `rgba(18, 74, 170, ${intensity * 0.16})`)
      gradient.addColorStop(highlight, `rgba(53, 130, 255, ${intensity})`)
      gradient.addColorStop(trailingEdge, `rgba(23, 88, 196, ${intensity * 0.2})`)
      gradient.addColorStop(1, 'rgba(15, 50, 110, 0)')
      return gradient
    }

    function draw(time: number) {
      const width = window.innerWidth
      const height = window.innerHeight

      context.clearRect(0, 0, width, height)
      context.save()
      context.translate(
        pointer.current.x * width * 0.018,
        pointer.current.y * height * 0.018,
      )
      context.lineCap = 'round'
      context.lineJoin = 'round'

      FLOW_LINES.forEach((line, index) => {
        traceFlowLine(line, time)
        context.strokeStyle = createFlowGradient(time, index, width, 0.18)
        context.lineWidth = Math.max(58, height * 0.09)
        context.filter = 'blur(10px)'
        context.stroke()

        traceFlowLine(line, time)
        context.strokeStyle = createFlowGradient(time, index, width, 0.3)
        context.lineWidth = Math.max(26, height * 0.04)
        context.filter = 'blur(4px)'
        context.stroke()
      })

      context.restore()
    }

    function animate(now: number) {
      pointer.current.x += (pointer.target.x - pointer.current.x) * 0.065
      pointer.current.y += (pointer.target.y - pointer.current.y) * 0.065
      if (isVisible) draw((now - startTime) / 1000)
      animationFrame = window.requestAnimationFrame(animate)
    }

    function updatePointer(event: PointerEvent) {
      pointer.target.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.target.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    function resetPointer() {
      pointer.target.x = 0
      pointer.target.y = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })

    resize()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', resetPointer)
    if (!reduceMotion) animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      document.documentElement.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  return <canvas id="flare-canvas" ref={canvasRef} aria-hidden="true" />
}
