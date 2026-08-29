import { useEffect, useMemo, useState } from 'react'
import type { SiteData } from '../../types'
import BasilIcon from '../ui/BasilIcon'
import styles from './RotatingInterest.module.css'

interface RotatingInterestProps {
  items: SiteData['home']['outsideInterests']
}

export default function RotatingInterest({ items }: RotatingInterestProps) {
  const [index, setIndex] = useState(0)
  const labels = useMemo(() => items.map((item) => item.label).join(', '), [items])

  useEffect(() => {
    if (items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 2400)
    return () => window.clearInterval(interval)
  }, [items])

  if (items.length === 0) return null
  const item = items[index]
  const content = (
    <div key={item.label} className={styles.item} aria-hidden="true">
      <BasilIcon name={item.icon} className={styles.icon} />
      <span className={styles.label}>{item.label}</span>
      {item.href && <span className={styles.external} aria-hidden="true">↗</span>}
    </div>
  )

  return (
    <div className={styles.rotator} aria-label={`Outside of work: ${labels}`}>
      {item.href ? (
        <a
          className={styles.link}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open my ${item.label} profile`}
        >
          {content}
        </a>
      ) : content}
    </div>
  )
}
