import styles from './Section.module.css'

/**
 * Section component wrapper with consistent padding
 * @param {React.ReactNode} children - Section content
 * @param {string} className - Additional CSS classes
 * @param {boolean} reveal - Whether to add reveal animation class
 */
export default function Section({ children, className = '', reveal = false }) {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className="container">
        {reveal && <div className="reveal" data-reveal>{children}</div>}
        {!reveal && children}
      </div>
    </section>
  )
}

