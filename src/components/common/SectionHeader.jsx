import Badge from './Badge'
import styles from './SectionHeader.module.css'

/**
 * SectionHeader component for consistent section headers
 * @param {string} badge - Badge text to display
 * @param {string} title - Optional title text
 * @param {string} className - Additional CSS classes
 */
export default function SectionHeader({ badge, title, className = '' }) {
  return (
    <div className={`${styles.headerRow} ${className}`}>
      {badge && <Badge>{badge}</Badge>}
      {title && <h1 className={styles.title}>{title}</h1>}
    </div>
  )
}

