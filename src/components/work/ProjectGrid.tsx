import ProjectCard from './ProjectCard'
import type { ProjectMeta } from '../../types'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: ProjectMeta[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
