import Badge from './Badge'
import styles from './TagList.module.css'

interface TagListProps {
  tags: string[]
  wrap?: boolean
}

export default function TagList({ tags, wrap = false }: TagListProps) {
  return (
    <div className={`${styles.list} ${wrap ? styles.wrap : ''}`}>
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  )
}
