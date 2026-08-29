import type { SiteData } from '../../types'
import EditorialHeading from '../ui/EditorialHeading'
import styles from './SkillsSection.module.css'

interface SkillsSectionProps {
  data: SiteData['home']['skills']
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
                    <span className={styles.iconShell} aria-hidden="true">
                      <img
                        className={`${styles.skillIcon} ${item.hoverIcon ? styles.primaryIcon : ''}`}
                        src={item.icon}
                        alt=""
                      />
                      {item.hoverIcon && (
                        <img
                          className={`${styles.skillIcon} ${styles.hoverIcon}`}
                          src={item.hoverIcon}
                          alt=""
                        />
                      )}
                    </span>
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
