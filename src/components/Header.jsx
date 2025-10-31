import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link to="/">
              <img src="/files/weblogo.png" alt="dB logo" className={styles.logo} />
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Career</Link>
            <Link to="/personal" className={styles.navLink}>Personal</Link>
          </nav>
          <div className={styles.meta}>
            <div className={styles.name}>Dishant Budhi</div>
            <div className={styles.location}>Boston, MA</div>
          </div>
        </div>
      </div>
    </header>
  )
}


