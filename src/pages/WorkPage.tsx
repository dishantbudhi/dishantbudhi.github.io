import { useProjects } from '../hooks/useProjects'
import { useFetch } from '../hooks/useFetch'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Section from '../components/common/Section'
import SectionHeader from '../components/common/SectionHeader'
import ProjectGrid from '../components/work/ProjectGrid'
import ResumeSection from '../components/work/ResumeSection'
import type { ResumeData } from '../types'
import styles from './WorkPage.module.css'

export default function WorkPage() {
  useRevealOnScroll()
  const { projects, loading: pLoading, error: pError } = useProjects()
  const { data: resume, loading: rLoading, error: rError } = useFetch<ResumeData>('/data/resume.json')

  return (
    <>
      <Section reveal>
        <h1 className={styles.headline}>Curious. Analytical. Grounded.</h1>
        <p className={styles.intro}>
          CS and Business student at Northeastern, focused on the intersection of
          technology and product strategy.{' '}
          <a href="mailto:budhi.d@northeastern.edu">Let&apos;s connect.</a>
        </p>
      </Section>

      <Section reveal>
        <SectionHeader badge="WORK" />
        {rLoading && <p className="muted">Loading...</p>}
        {rError && <p className="muted">Failed to load experience.</p>}
        {resume && <ResumeSection data={resume} />}
      </Section>

      <Section reveal>
        <SectionHeader badge="PROJECTS" />
        {pLoading && <p className="muted">Loading...</p>}
        {pError && <p className="muted">Failed to load projects.</p>}
        {!pLoading && !pError && <ProjectGrid projects={projects} />}
      </Section>

    </>
  )
}
