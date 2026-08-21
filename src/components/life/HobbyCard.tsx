import { Link } from 'react-router-dom'
import type { HobbyMeta } from '../../types'
import CardPreview from '../common/CardPreview'
import styles from './HobbyCard.module.css'

export default function HobbyCard({ hobby }: { hobby: HobbyMeta }) {
  return (
    <Link to={`/personal/${hobby.slug}`} className={`${styles.card} interactiveCard`}>
      <CardPreview image={hobby.previewImage} />
      <div className={styles.body}>
        <h3 className={styles.title}>{hobby.title}</h3>
        <p className={styles.summary}>{hobby.summary}</p>
      </div>
    </Link>
  )
}
