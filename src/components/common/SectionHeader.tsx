import Badge from './Badge'

interface SectionHeaderProps {
  badge?: string
  title?: string
  className?: string
}

export default function SectionHeader({ badge, title, className = '' }: SectionHeaderProps) {
  return (
    <div className={`sectionHeader ${className}`.trim()}>
      {badge && <Badge>{badge}</Badge>}
      {title && <h2 className="sectionTitle">{title}</h2>}
    </div>
  )
}
