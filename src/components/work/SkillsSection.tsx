import type { SiteData } from '../../types'
import EditorialHeading from '../common/EditorialHeading'
import styles from './SkillsSection.module.css'

interface SkillsSectionProps {
  data: SiteData['professional']['skills']
}

function getInitials(name: string) {
  const words = name.split(/[\s/&.-]+/).filter(Boolean)
  return (words.length > 1 ? words.map((word) => word[0]).join('') : name.slice(0, 2)).toUpperCase()
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <div className={styles.section}>
      <EditorialHeading data={data} />
      <div className={styles.grid}>
        {data.categories.map((category) => (
          <article className={styles.category} key={category.title} data-cursor-glow>
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((item) => (
                <li key={item.name}>
                  {item.icon ? (
                    <img className={styles.skillIcon} src={item.icon} alt="" />
                  ) : (
                    <span className={styles.iconPlaceholder} aria-hidden="true">
                      {getInitials(item.name)}
                    </span>
                  )}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
