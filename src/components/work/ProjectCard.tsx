import { Link } from 'react-router-dom'
import CardPreview from '../common/CardPreview'
import TagList from '../common/TagList'
import type { ProjectFull } from '../../types'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: ProjectFull
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/professional/${project.slug}`}
      className={`${styles.card} interactiveCard`}
    >
      <CardPreview image={project.previewImage} eyebrow={String(project.year)} />
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <TagList tags={project.tags} />
      </div>
    </Link>
  )
}
