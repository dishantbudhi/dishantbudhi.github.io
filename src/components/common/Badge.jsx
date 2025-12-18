import styles from './Badge.module.css'

/**
 * Badge component for displaying labels/tags
 * @param {string} children - The text content of the badge
 * @param {string} className - Additional CSS classes
 */
export default function Badge({ children, className = '' }) {
  return (
    <div className={`badge ${className}`}>
      {children}
    </div>
  )
}

