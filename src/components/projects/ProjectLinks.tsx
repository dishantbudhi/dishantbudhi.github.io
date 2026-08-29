import type { ProjectFull } from '../../types'
import BasilIcon from '../ui/BasilIcon'
import styles from './ProjectLinks.module.css'

interface ProjectLinksProps {
  project: ProjectFull
}

export default function ProjectLinks({ project }: ProjectLinksProps) {
  const links = [
    {
      id: 'github',
      label: 'GitHub',
      description: 'View repository',
      href: project.githubHref,
      icon: 'github' as const,
    },
    ...(project.projectLink
      ? [{
          id: 'project',
          label: project.projectLink.label,
          description: 'Visit project',
          href: project.projectLink.href,
          icon: 'folder' as const,
        }]
      : []),
  ]

  return (
    <nav className={styles.links} aria-label={`${project.title} links`}>
      {links.map((link) => (
        <a
          key={link.id}
          className={styles.card}
          data-cursor-glow
          href={link.href}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.cardHeader}>
            <span className={styles.symbol} aria-hidden="true">
              <BasilIcon name={link.icon} />
            </span>
            <BasilIcon name="arrowUp" className={styles.externalIcon} />
          </span>
          <span className={styles.copy}>
            <strong>{link.label}</strong>
            <small>{link.description}</small>
          </span>
        </a>
      ))}
    </nav>
  )
}
