import { useProjects } from '../hooks/useProjects'
import { useJsonData } from '../hooks/useJsonData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { contentPaths } from '../config/content'
import Section from '../components/ui/Section'
import EditorialHeading from '../components/ui/EditorialHeading'
import BasilIcon from '../components/ui/BasilIcon'
import ProjectGrid from '../components/projects/ProjectGrid'
import ResumeSection from '../components/home/ResumeSection'
import SkillsSection from '../components/home/SkillsSection'
import ContactSection from '../components/home/ContactSection'
import RotatingInterest from '../components/home/RotatingInterest'
import type { ResumeData, SiteData } from '../types'
import styles from './HomePage.module.css'

export default function HomePage({ site }: { site: SiteData }) {
  useRevealOnScroll()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()
  const {
    data: resume,
    loading: resumeLoading,
    error: resumeError,
  } = useJsonData<ResumeData>(contentPaths.resume)

  return (
    <>
      <Section id="profile" reveal className={`${styles.sectionAnchor} ${styles.profileSection}`}>
        <EditorialHeading data={site.home.profileHeading} />
        <div className={styles.profileGrid}>
          <article className={`${styles.profileCard} ${styles.experienceCard}`} data-cursor-glow>
            <p className={styles.cardLabel}>{site.home.experienceLabel}</p>
            {resumeLoading && <p className="muted">{site.ui.loading}</p>}
            {resumeError && <p className="muted">{site.ui.experienceError}</p>}
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
              {site.home.headline.split('.').filter(Boolean).map((line) => (
                <span key={line}>{line.trim()}.</span>
              ))}
            </p>
          </article>
        </div>

        <div className={styles.lowerTileGrid}>
          <article id="outside-work" className={`${styles.profileCard} ${styles.interestCard}`} data-cursor-glow>
            <p className={styles.cardLabel}>{site.home.alsoLikeLabel}</p>
            <RotatingInterest items={site.home.outsideInterests} />
          </article>

          <article className={`${styles.profileCard} ${styles.focusCard}`} data-cursor-glow>
            <p>{site.home.focusStatement}</p>
          </article>
        </div>
      </Section>

      <Section id="projects" reveal className={`${styles.sectionAnchor} ${styles.projectsSection}`}>
        <div className={styles.projectsHeader}>
          <EditorialHeading data={site.home.projectsHeading} className={styles.projectsHeading} />
          <a
            className={styles.viewAll}
            href={site.home.projectsGithubHref}
            target="_blank"
            rel="noreferrer"
          >
            View All
          </a>
        </div>
        {projectsLoading && <p className="muted">{site.ui.loading}</p>}
        {projectsError && <p className="muted">{site.ui.projectsError}</p>}
        {!projectsLoading && !projectsError && <ProjectGrid projects={projects} />}
      </Section>

      <Section id="skills" reveal className={`${styles.sectionAnchor} ${styles.skillsSection}`}>
        <SkillsSection data={site.home.skills} />
      </Section>

      <Section id="contact" reveal className={styles.contactSection}>
        <ContactSection data={site.home.contact} />
      </Section>
    </>
  )
}
