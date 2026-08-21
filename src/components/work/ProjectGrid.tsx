import ProjectCard from './ProjectCard'
import CardGrid from '../common/CardGrid'
import type { ProjectFull } from '../../types'

interface ProjectGridProps {
  projects: ProjectFull[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <CardGrid>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </CardGrid>
  )
}
