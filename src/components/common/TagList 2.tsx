import Badge from './Badge'
import styles from './TagList.module.css'

interface TagListProps {
  tags: string[]
  align?: 'start' | 'end'
}

export default function TagList({ tags, align = 'start' }: TagListProps) {
  return (
    <div className={`${styles.list} ${align === 'end' ? styles.end : ''}`}>
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  )
}
