import type { ResumeData } from '../../types'
import styles from './ResumeSection.module.css'

interface ResumeSectionProps {
  data: ResumeData
}

export default function ResumeSection({ data }: ResumeSectionProps) {
  return (
    <div className={styles.list}>
      {data.experience.map((exp) => (
        <div key={exp.company} className={styles.item}>
          <div className={styles.left}>
            <div className={styles.company}>{exp.company}</div>
            <div className={styles.role}>{exp.role}</div>
            {exp.team && <div className={styles.team}>{exp.team}</div>}
            <div className={styles.dates}>{exp.dates}</div>
          </div>
          <ul className={styles.bullets}>
            {exp.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
