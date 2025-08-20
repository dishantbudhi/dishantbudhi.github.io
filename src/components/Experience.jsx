import styles from './Experience.module.css'
import { experienceData } from '../data/experienceData'

export default function Experience() {
  return (
    <section className={styles.section}>
      <div className="container reveal" data-reveal>
        <div className={styles.headerRow}>
          <div className="badge">WORK</div>
        </div>
        <div className={styles.list}>
          {experienceData.map((exp) => (
            <div key={exp.company} className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.role}>{exp.role}</div>
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


