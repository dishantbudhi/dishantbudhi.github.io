import type { HobbyFull } from '../../types'
import styles from './HobbyDetail.module.css'

export default function HobbyDetail({ hobby }: { hobby: HobbyFull }) {
  return (
    <div className={styles.detail}>
      <h2 className={styles.title}>{hobby.title}</h2>
      <p className={styles.description}>{hobby.description}</p>
    </div>
  )
}
