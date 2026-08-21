import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { SiteData } from '../../types'
import styles from './NavBar.module.css'

export default function NavBar({ site }: { site: SiteData }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  function isActive(path: string): boolean {
    return pathname === path || pathname.startsWith(path + '/')
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    function closeOnOutsideClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand} ref={menuRef}>
            <button
              type="button"
              className={styles.brandButton}
              aria-label={site.brand.menuLabel}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              onClick={() => setIsOpen((open) => !open)}
            >
              <img src={site.brand.logo} alt={site.brand.alt} className={`${styles.logo} logo`} />
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
            </button>
            {isOpen && (
              <nav className={styles.menu} aria-label={site.brand.menuLabel}>
                {site.navigation.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`${styles.menuItem} ${isActive(item.path) ? styles.menuItemActive : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <div className={styles.meta}>
            <div className={styles.name}>{site.profile.name}</div>
            <div className={styles.location}>{site.profile.location}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
