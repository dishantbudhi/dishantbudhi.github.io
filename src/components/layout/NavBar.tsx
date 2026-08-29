import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { SiteData } from '../../types'
import BasilIcon, { contactIconById } from '../ui/BasilIcon'
import BottomDock from './BottomDock'
import styles from './NavBar.module.css'

export default function NavBar({ site }: { site: SiteData }) {
  const { pathname } = useLocation()
  const isLandingPage = pathname === '/'
  const [isCompact, setIsCompact] = useState(
    () => !isLandingPage || window.scrollY > 32,
  )
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false)
  const headerLinks = useMemo(
    () => [...site.home.contact.links]
      .filter((link) => link.headerOrder !== undefined)
      .sort((a, b) => (a.headerOrder ?? 0) - (b.headerOrder ?? 0)),
    [site.home.contact.links],
  )

  useEffect(() => {
    function updateHeaderState() {
      setIsCompact(!isLandingPage || window.scrollY > 32)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [isLandingPage])

  return (
    <>
      <header id="home" className={`${styles.header} ${isLandingPage ? styles.expanded : styles.compact}`}>
        <div className={`container ${styles.container}`}>
          <div className={styles.inner}>
            <div className={styles.heroCopy}>
              <h1 className={styles.title}>
                <span className={styles.greeting}>{site.home.hero.greeting}</span>
                <span className={styles.identity}><span className={styles.im}>I’m</span><em>{site.profile.name}</em></span>
              </h1>
              <div className={styles.ctaRow}>
                <a className={styles.primaryCta} href={site.home.ctaHref}>
                  <span>{site.home.ctaLabel}</span>
                </a>
                <a className={styles.secondaryCta} href={site.home.hero.workHref}>
                  <span>{site.home.hero.workLabel}</span>
                </a>
              </div>
              <button
                className={`${styles.mobileActionsToggle} ${mobileActionsOpen ? styles.mobileActionsToggleOpen : ''}`}
                type="button"
                aria-label={mobileActionsOpen ? 'Close profile actions' : 'Open profile actions'}
                aria-expanded={mobileActionsOpen}
                aria-controls="mobile-profile-actions"
                onClick={() => setMobileActionsOpen((open) => !open)}
              >
                <span aria-hidden="true">•••</span>
              </button>
              <div
                id="mobile-profile-actions"
                className={`${styles.socialLinks} ${mobileActionsOpen ? styles.mobileActionsOpen : ''}`}
                aria-label="Profile links"
              >
                {headerLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    download={link.download || undefined}
                    aria-label={link.label}
                    onClick={() => setMobileActionsOpen(false)}
                  >
                    <BasilIcon name={contactIconById[link.id] ?? 'arrowUp'} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      {isLandingPage && <BottomDock items={site.dockNavigation} visible={isCompact} />}
      <div
        className={`${styles.spacer} ${isLandingPage ? styles.landingSpacer : styles.compactSpacer}`}
        aria-hidden="true"
      />
    </>
  )
}
