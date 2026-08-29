import { useEffect } from 'react'

export function useCursorGlow() {
  useEffect(() => {
    function updateGlowOrigin(event: PointerEvent) {
      const source = event.target
      if (!(source instanceof Element)) return

      const card = source.closest<HTMLElement>('[data-cursor-glow]')
      if (!card) return

      const bounds = card.getBoundingClientRect()
      card.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`)
      card.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`)
    }

    document.addEventListener('pointermove', updateGlowOrigin, { passive: true })
    return () => document.removeEventListener('pointermove', updateGlowOrigin)
  }, [])
}
