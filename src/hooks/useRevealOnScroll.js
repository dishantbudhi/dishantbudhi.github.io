import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useRevealOnScroll() {
  const location = useLocation()
  
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 }
    )

    for (const el of elements) {
      el.classList.add('reveal')
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [location.pathname])
}


