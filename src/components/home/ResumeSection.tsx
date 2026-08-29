import type { ResumeData } from '../../types'
import styles from './ResumeSection.module.css'

interface ResumeSectionProps {
  data: ResumeData
}

function isCurrentExperience(startDate: string, endDate?: string) {
  const now = new Date()
  const start = new Date(`${startDate}T00:00:00`)
  const end = endDate ? new Date(`${endDate}T23:59:59`) : null

  return now >= start && (!end || now <= end)
}

export default function ResumeSection({ data }: ResumeSectionProps) {
  const experience = [...data.experience].sort((a, b) => {
    const aEnd = a.endDate ? new Date(`${a.endDate}T23:59:59`).getTime() : Number.POSITIVE_INFINITY
    const bEnd = b.endDate ? new Date(`${b.endDate}T23:59:59`).getTime() : Number.POSITIVE_INFINITY
    return bEnd - aEnd
  })

  return (
    <div className={styles.list}>
      {experience.map((exp) => {
        const isCurrent = isCurrentExperience(exp.startDate, exp.endDate)

        return (
        <div key={exp.company} className={styles.item}>
          <span
            className={`${styles.marker} ${isCurrent ? styles.markerCurrent : ''}`.trim()}
            aria-hidden="true"
          />
          <div className={styles.content}>
            <div className={styles.role} title={exp.role}>{exp.role}</div>
            <div className={styles.company} title={exp.company}>
              {exp.href ? (
                <a href={exp.href} target="_blank" rel="noreferrer">{exp.company}</a>
              ) : exp.company}
            </div>
            {exp.team && <div className={styles.team} title={exp.team}>{exp.team}</div>}
            <div className={styles.dates} title={exp.dates}>{exp.dates}</div>
          </div>
        </div>
        )
      })}
    </div>
  )
}
