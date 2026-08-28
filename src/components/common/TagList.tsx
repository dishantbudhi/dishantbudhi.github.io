import Badge from './Badge'
import styles from './TagList.module.css'

interface TagListProps {
  tags: string[]
  align?: 'start' | 'end'
  wrap?: boolean
}

export default function TagList({ tags, align = 'start', wrap = false }: TagListProps) {
  return (
    <div className={`${styles.list} ${align === 'end' ? styles.end : ''} ${wrap ? styles.wrap : ''}`}>
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  )
}
