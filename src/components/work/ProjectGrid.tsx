import { useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import type { ProjectFull } from '../../types'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: ProjectFull[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveIndex = () => {
    const track = trackRef.current
    if (!track) return

    const closestIndex = Array.from(track.children).reduce((closest, child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft)
      const closestDistance = Math.abs((track.children[closest] as HTMLElement).offsetLeft - track.scrollLeft)
      return distance < closestDistance ? index : closest
    }, 0)

    setActiveIndex(closestIndex)
  }

  const scrollToProject = (index: number) => {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

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
            onClick={() => scrollToProject(index)}
            aria-label={`Show ${project.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
