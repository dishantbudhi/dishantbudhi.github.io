import styles from './PageHero.module.css'

interface PageHeroProps {
  title: string
  description: string
  action?: {
    href: string
    label: string
  }
}

export default function PageHero({ title, description, action }: PageHeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>
        {description}
        {action && (
          <>
            {' '}
            <a href={action.href}>{action.label}</a>
          </>
        )}
      </p>
    </div>
  )
}
