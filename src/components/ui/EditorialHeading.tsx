import type { EditorialHeadingData } from '../../types/site'
import styles from './EditorialHeading.module.css'

interface EditorialHeadingProps {
  data: EditorialHeadingData
  className?: string
}

export default function EditorialHeading({ data, className = '' }: EditorialHeadingProps) {
  return (
    <header className={`${styles.header} ${className}`.trim()}>
      <p>{data.label}</p>
      <h2>{data.title}</h2>
    </header>
  )
}
