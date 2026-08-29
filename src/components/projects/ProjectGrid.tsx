import ProjectCard from './ProjectCard'
import type { ProjectFull } from '../../types'
import { useHorizontalCarousel } from '../../hooks/useHorizontalCarousel'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: ProjectFull[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { trackRef, activeIndex, updateActiveIndex, scrollToItem } = useHorizontalCarousel()

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={updateActiveIndex}
        aria-label="Projects carousel"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className={styles.indicator} aria-label={`Project ${activeIndex + 1} of ${projects.length}`}>
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className={index === activeIndex ? styles.active : ''}
            onClick={() => scrollToItem(index)}
            aria-label={`Show ${project.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
