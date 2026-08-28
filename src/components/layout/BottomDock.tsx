import { useEffect, useState } from 'react'
import type { DockNavigationItem } from '../../types'
import BasilIcon from '../common/BasilIcon'
import styles from './BottomDock.module.css'

interface BottomDockProps {
  items: DockNavigationItem[]
  visible: boolean
}

export default function BottomDock({ items, visible }: BottomDockProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'top')

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

  return (
    <nav className={`${styles.dock} ${visible ? styles.visible : ''}`} aria-label="Page sections">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
          aria-label={item.label}
          aria-current={activeId === item.id ? 'location' : undefined}
          title={item.label}
        >
          <BasilIcon name={item.icon} />
        </a>
      ))}
    </nav>
  )
}
