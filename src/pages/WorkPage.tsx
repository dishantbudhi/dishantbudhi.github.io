import { useProjects } from '../hooks/useProjects'
import { useFetch } from '../hooks/useFetch'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Section from '../components/common/Section'
import SectionHeader from '../components/common/SectionHeader'
import PageHero from '../components/common/PageHero'
import ProjectGrid from '../components/work/ProjectGrid'
import ResumeSection from '../components/work/ResumeSection'
import type { ResumeData, SiteData } from '../types'

export default function WorkPage({ site }: { site: SiteData }) {
  useRevealOnScroll()
  const { projects, loading: pLoading, error: pError } = useProjects()
  const { data: resume, loading: rLoading, error: rError } = useFetch<ResumeData>('/data/resume.json')

  return (
    <>
      <Section reveal variant="hero">
        <PageHero
          title={site.professional.headline}
          description={site.professional.intro}
          action={{ href: site.professional.ctaHref, label: site.professional.ctaLabel }}
        />
      </Section>

      <Section reveal>
        <SectionHeader badge={site.professional.experienceLabel} />
        {rLoading && <p className="muted">{site.ui.loading}</p>}
        {rError && <p className="muted">{site.ui.experienceError}</p>}
        {resume && <ResumeSection data={resume} />}
      </Section>

      <Section reveal>
        <SectionHeader badge={site.professional.projectsLabel} />
        {pLoading && <p className="muted">{site.ui.loading}</p>}
        {pError && <p className="muted">{site.ui.projectsError}</p>}
        {!pLoading && !pError && <ProjectGrid projects={projects} />}
      </Section>
    </>
  )
}
