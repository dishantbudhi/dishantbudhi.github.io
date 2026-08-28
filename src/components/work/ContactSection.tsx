import type { SiteData } from '../../types'
import BasilIcon, { contactIconById } from '../common/BasilIcon'
import EditorialHeading from '../common/EditorialHeading'
import styles from './ContactSection.module.css'

interface ContactSectionProps {
  data: SiteData['professional']['contact']
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <div className={styles.section} id="contact">
      <EditorialHeading data={data.heading} />

      <div className={styles.grid}>
        {data.links.map((link) => (
          <a
            key={link.id}
            className={`${styles.card} ${styles[link.id]}`}
            data-cursor-glow
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            download={link.download || undefined}
          >
            <div className={styles.cardHeader}>
              <span className={styles.symbol} aria-hidden="true">
                <BasilIcon name={contactIconById[link.id] ?? 'arrowUp'} />
              </span>
              <span className={styles.arrowFrame} aria-hidden="true">
                <BasilIcon
                  name="arrowUp"
                  className={`${styles.externalIcon} ${link.id === 'resume' ? styles.downloadArrow : styles.diagonalArrow}`}
                />
              </span>
            </div>
            <div className={styles.copy}>
              <strong>{link.label}</strong>
              <p>{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
