import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <img src="/files/weblogo.png" alt="dB logo" className={styles.logo} />
          </div>
          <div className={styles.meta}>
            <div className={styles.name}>Dishant Budhi</div>
            <div className={styles.location}>Boston, MA</div>
          </div>
        </div>
      </div>
    </header>
  )
}


