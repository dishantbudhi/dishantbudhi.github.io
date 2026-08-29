import styles from './Footer.module.css'
import type { SiteData } from '../../types'
import BasilIcon from '../ui/BasilIcon'

export default function Footer({ data }: { data: SiteData['footer'] }) {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.credit}>
            <div className={styles.meta}>{data.copyright}</div>
            <a
              className={styles.source}
              href={data.sourceHref}
              target="_blank"
              rel="noreferrer"
            >
              <span>{data.sourceLabel}</span>
              <BasilIcon name="arrowUp" className={styles.externalIcon} />
            </a>
          </div>
          <button
            className={styles.backToTop}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <BasilIcon name="arrowUp" />
            <span>{data.backToTopLabel}</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
