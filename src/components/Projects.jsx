import styles from './Projects.module.css'
import { projectData } from '../data/projectData'
import SectionHeader from './common/SectionHeader'

/**
 * Projects component - displays a horizontal scrolling list of projects
 * @param {Array} projects - Optional array of projects to display (defaults to projectData)
 */
export default function Projects({ projects = projectData }) {
  return (
    <section className={styles.section}>
      <div className="container reveal" data-reveal>
        <SectionHeader badge="PROJECTS" />
        <div className={styles.grid}>
          {projects.map((proj) => (
            <a key={proj.title} href={proj.href} target="_blank" rel="noreferrer" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.icon}>{proj.icon}</div>
                <div className={styles.title}>{proj.title}</div>
              </div>
              <div className={styles.tag}>{proj.tag}</div>
              {proj.period && (
                <div className={styles.period}>{proj.period}</div>
              )}
              {proj.description && (
                <p className={styles.description}>{proj.description}</p>
              )}
              {proj.skills && (
                <div className={styles.skills}>
                  <strong>Skills:</strong> {proj.skills}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


