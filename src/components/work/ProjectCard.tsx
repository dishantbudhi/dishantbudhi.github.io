import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import type { ProjectMeta } from '../../types'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: ProjectMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imgSrc = `/data/projects/${project.slug}/${project.thumbnail}`

  return (
    <Link to={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imgSrc} alt={project.title} className={styles.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.year}>{project.year}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
