import { Link } from 'react-router-dom'
import type { ProjectFull, SiteData } from '../../types'
import BasilIcon from '../ui/BasilIcon'
import TagList from '../ui/TagList'
import ProjectGallery from './ProjectGallery'
import ProjectText from './ProjectText'
import { getProjectStack, isProjectSection } from './projectContent'
import styles from './ProjectDetail.module.css'

interface ProjectDetailProps {
  project: ProjectFull
  labels: SiteData['ui']
}

export default function ProjectDetail({ project, labels }: ProjectDetailProps) {
  const contentSections = project.sections.filter((section) => !isProjectSection(section, 'Stack'))
  const stackItems = getProjectStack(project)

  return (
    <article className={styles.article}>
      <div className="container">
        <Link to="/#projects" className={styles.back}>
          <BasilIcon name="arrowLeft" />
          <span>Back</span>
        </Link>

        <header className={styles.header}>
          <div className={styles.eyebrow}>{project.year}</div>
          <h1 className={styles.title}>{project.title}</h1>
        </header>

        {project.detailImages.length > 0 && (
          <div className={styles.projectGallery}>
            <ProjectGallery images={project.detailImages} labels={labels} />
          </div>
        )}

        <div className={styles.projectGrid}>
          {contentSections.map((section, index) => (
            <section
              key={`${project.slug}-${index}`}
              className={`${styles.projectTile} ${index >= 2 ? styles.wideTile : ''}`}
              data-cursor-glow
            >
              <ProjectText content={section.content} />
            </section>
          ))}

          {stackItems.length > 0 && (
            <section className={`${styles.projectTile} ${styles.stackTile}`} data-cursor-glow>
              <p className={styles.tileLabel}>Stack</p>
              <TagList tags={stackItems} wrap />
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
