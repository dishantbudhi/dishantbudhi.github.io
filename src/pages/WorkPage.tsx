import { useProjects } from '../hooks/useProjects'
import { useFetch } from '../hooks/useFetch'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Section from '../components/common/Section'
import EditorialHeading from '../components/common/EditorialHeading'
import BasilIcon from '../components/common/BasilIcon'
import ProjectGrid from '../components/work/ProjectGrid'
import ResumeSection from '../components/work/ResumeSection'
import SkillsSection from '../components/work/SkillsSection'
import ContactSection from '../components/work/ContactSection'
import RotatingInterest from '../components/work/RotatingInterest'
import type { ResumeData, SiteData } from '../types'
import styles from './WorkPage.module.css'

export default function WorkPage({ site }: { site: SiteData }) {
  useRevealOnScroll()
  const { projects, loading: pLoading, error: pError } = useProjects()
  const { data: resume, loading: rLoading, error: rError } = useFetch<ResumeData>('/data/resume.json')

  return (
    <>
      <div id="profile" className={styles.sectionAnchor}>
      <Section reveal className={styles.profileSection}>
        <EditorialHeading data={site.professional.profileHeading} />
        <div className={styles.profileGrid}>
          <article className={`${styles.profileCard} ${styles.experienceCard}`} data-cursor-glow>
            <p className={styles.cardLabel}>{site.professional.experienceLabel}</p>
            {rLoading && <p className="muted">{site.ui.loading}</p>}
            {rError && <p className="muted">{site.ui.experienceError}</p>}
            {resume && <ResumeSection data={resume} />}
          </article>

          <article className={`${styles.profileCard} ${styles.locationCard}`} data-cursor-glow>
            <iframe
              className={styles.mapLayer}
              src={site.profile.mapEmbedHref}
              title="Map of Boston"
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
            />
            <a
              className={styles.locationLink}
              href={site.profile.mapsHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Get directions to ${site.profile.address}`}
            >
              <p className={styles.cardLabel}>BASED IN</p>
              <p className={styles.location}>
                {site.profile.location}
                <BasilIcon name="location" className={styles.locationIcon} />
              </p>
            </a>
          </article>

          <article className={`${styles.profileCard} ${styles.statementCard}`} data-cursor-glow>
            <p>
              {site.professional.headline.split('.').filter(Boolean).map((line) => (
                <span key={line}>{line.trim()}.</span>
              ))}
            </p>
          </article>
        </div>

        <div className={styles.lowerTileGrid}>
          <article id="outside-work" className={`${styles.profileCard} ${styles.interestCard}`} data-cursor-glow>
            <p className={styles.cardLabel}>{site.professional.alsoLikeLabel}</p>
            <RotatingInterest items={site.professional.outsideInterests} />
          </article>

          <article className={`${styles.profileCard} ${styles.focusCard}`} data-cursor-glow>
            <p>{site.professional.focusStatement}</p>
          </article>
        </div>
      </Section>
      </div>

      <div id="projects" className={styles.sectionAnchor}>
      <Section reveal className={styles.projectsSection}>
        <div className={styles.projectsHeader}>
          <EditorialHeading data={site.professional.projectsHeading} className={styles.projectsHeading} />
          <a
            className={styles.viewAll}
            href={site.professional.projectsGithubHref}
            target="_blank"
            rel="noreferrer"
          >
            View All
          </a>
        </div>
        {pLoading && <p className="muted">{site.ui.loading}</p>}
        {pError && <p className="muted">{site.ui.projectsError}</p>}
        {!pLoading && !pError && (
          <ProjectGrid projects={projects} />
        )}
      </Section>
      </div>

      <div id="skills" className={styles.sectionAnchor}>
      <Section reveal className={styles.skillsSection}>
        <SkillsSection data={site.professional.skills} />
      </Section>
      </div>

      <Section reveal className={styles.contactSection}>
        <ContactSection data={site.professional.contact} />
      </Section>
    </>
  )
}
