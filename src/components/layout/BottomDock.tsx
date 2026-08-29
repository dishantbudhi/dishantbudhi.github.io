import { useEffect, useState, type MouseEvent } from 'react'
import type { DockNavigationItem } from '../../types'
import BasilIcon from '../ui/BasilIcon'
import styles from './BottomDock.module.css'

interface BottomDockProps {
  items: DockNavigationItem[]
  visible: boolean
}

export default function BottomDock({ items, visible }: BottomDockProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'top')
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function updateActiveSection() {
      const activationLine = window.innerHeight * 0.42
      let current = items[0]?.id ?? 'top'

      for (const item of items) {
        const target = document.querySelector<HTMLElement>(item.href)
        if (target && target.getBoundingClientRect().top <= activationLine) current = item.id
      }

      setActiveId(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [items])

  const showDock = visible && !footerVisible

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, item: DockNavigationItem) {
    const target = document.querySelector<HTMLElement>(item.href)
    if (!target) return

    event.preventDefault()
    window.history.pushState(null, '', item.href)
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
    setActiveId(item.id)
  }

  return (
    <nav
      className={`${styles.dock} ${showDock ? styles.visible : ''}`}
      aria-label="Page sections"
      aria-hidden={!showDock}
    >
      {items.map((item) => (
        <span className={styles.itemSlot} key={item.id}>
          <a
            href={item.href}
            onClick={(event) => handleNavigation(event, item)}
            className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
            aria-label={item.label}
            aria-current={activeId === item.id ? 'location' : undefined}
            title={item.label}
            tabIndex={showDock ? undefined : -1}
          >
            <BasilIcon name={item.icon} />
          </a>
        </span>
      ))}
    </nav>
  )
}
