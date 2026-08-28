import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { SiteData } from '../../types'
import BasilIcon, { contactIconById } from '../common/BasilIcon'
import BottomDock from './BottomDock'
import styles from './NavBar.module.css'

export default function NavBar({ site }: { site: SiteData }) {
  const { pathname } = useLocation()
  const isLandingPage = pathname === '/'
  const [isCompact, setIsCompact] = useState(
    () => !isLandingPage || window.scrollY > 32,
  )
  const headerLinks = [...site.professional.contact.links]
    .filter((link) => link.headerOrder !== undefined)
    .sort((a, b) => (a.headerOrder ?? 0) - (b.headerOrder ?? 0))

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
                <span className={styles.greeting}>{site.professional.hero.greeting}</span>
                <span className={styles.identity}><span className={styles.im}>I’m</span><em>{site.profile.name}</em></span>
              </h1>
              <div className={styles.ctaRow}>
                <a className={styles.primaryCta} href={site.professional.ctaHref}>
                  <span>{site.professional.ctaLabel}</span>
                </a>
                <a className={styles.secondaryCta} href={site.professional.hero.workHref}>
                  <span>{site.professional.hero.workLabel}</span>
                </a>
              </div>
              <div className={styles.socialLinks} aria-label="Profile links">
                {headerLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    download={link.download || undefined}
                    aria-label={link.label}
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
