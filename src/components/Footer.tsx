import styles from './Footer.module.css'
import type { SiteData } from '../types'

export default function Footer({ data }: { data: SiteData['footer'] }) {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.version}>{data.version} · Last updated: {data.lastUpdated}</div>
          <div className={styles.links}>
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                download={link.download || undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
