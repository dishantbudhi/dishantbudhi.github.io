import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar() {
  const { pathname } = useLocation()

  function isActive(path: string): boolean {
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link to="/work">
              <img src="/files/weblogo.png" alt="dB logo" className={`${styles.logo} logo`} />
            </Link>
          </div>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link
              to="/work"
              className={`${styles.navLink} ${isActive('/work') ? styles.navLinkActive : ''}`}
            >
              Work
            </Link>
            <Link
              to="/life"
              className={`${styles.navLink} ${isActive('/life') ? styles.navLinkActive : ''}`}
            >
              Life
            </Link>
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
