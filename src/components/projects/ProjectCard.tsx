import { Link } from 'react-router-dom'
import TagList from '../ui/TagList'
import BasilIcon from '../ui/BasilIcon'
import type { ProjectFull } from '../../types'
import { getProjectOverview, getProjectStack } from './projectContent'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: ProjectFull
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const overview = getProjectOverview(project)
  const cardTags = getProjectStack(project).slice(0, 3)

  return (
    <article className={`${styles.card} interactiveCard`} data-cursor-glow>
      <div className={styles.body}>
        <div className={styles.header}>
          <Link to={`/projects/${project.slug}`} className={styles.titleLink}>
            <h3 className={styles.title}>{project.title}</h3>
          </Link>
          <span className={styles.year}>{project.year}</span>
        </div>
        <Link to={`/projects/${project.slug}`} className={styles.primary}>
          <p className={styles.summary}>{overview}</p>
        </Link>
        <div className={styles.footer}>
          <TagList tags={cardTags} />
          <a
            className={styles.githubLink}
            href={project.githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            title={`View ${project.title} on GitHub`}
          >
            <BasilIcon name="github" className={styles.githubIcon} />
          </a>
        </div>
      </div>
    </article>
  )
}
