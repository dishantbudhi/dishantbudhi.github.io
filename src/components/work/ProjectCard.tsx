import { Link } from 'react-router-dom'
import TagList from '../common/TagList'
import BasilIcon from '../common/BasilIcon'
import type { ProjectFull } from '../../types'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: ProjectFull
}

function getOverview(project: ProjectFull) {
  const overview = project.blocks.find(
    (block) => block.type === 'text' && /^##\s+Overview\s*$/im.test(block.content),
  )

  return overview?.type === 'text'
    ? overview.content.replace(/^##\s+Overview\s*/i, '').trim()
    : project.summary
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const overview = getOverview(project)

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
          <TagList tags={project.tags} wrap />
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
