import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.version}>v4.1.2 · Last updated: December 2025</div>
          <div className={styles.links}>
            <a href="https://github.com/dishantbudhi" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/dishantbudhi" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://calendly.com/dbudhi" target="_blank" rel="noreferrer">Calendly</a>
            <a href="./files/resume.pdf" download>Resume</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


