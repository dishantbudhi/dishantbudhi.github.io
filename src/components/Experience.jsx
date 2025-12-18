import styles from './Experience.module.css'
import { experienceData } from '../data/experienceData'
import SectionHeader from './common/SectionHeader'

/**
 * Experience component - displays work experience entries
 * @param {Array} experiences - Optional array of experiences to display (defaults to experienceData)
 */
export default function Experience({ experiences = experienceData }) {
  return (
    <section className={styles.section}>
      <div className="container reveal" data-reveal>
        <SectionHeader badge="WORK" />
        <div className={styles.list}>
          {experiences.map((exp) => (
            <div key={exp.company} className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.role}>{exp.role}</div>
                {exp.team && (
                  <div className={styles.team}>{exp.team}</div>
                )}
                <div className={styles.period}>
                  {exp.period}
                </div>
              </div>
              <div className={styles.itemRight}>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


