import { Link } from 'react-router-dom'
import type { HobbyMeta } from '../../types'
import styles from './HobbyCard.module.css'

export default function HobbyCard({ hobby }: { hobby: HobbyMeta }) {
  return (
    <Link to={`/life/${hobby.slug}`} className={styles.card}>
      <div className={styles.title}>{hobby.title}</div>
      <p className={styles.summary}>{hobby.summary}</p>
      <span className={styles.arrow}>→</span>
    </Link>
  )
}
