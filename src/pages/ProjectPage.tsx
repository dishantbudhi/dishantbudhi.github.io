import { Link, useParams } from 'react-router-dom'
import ProjectDetail from '../components/projects/ProjectDetail'
import { useProject } from '../hooks/useProjects'
import type { SiteData } from '../types'

export default function ProjectPage({ site }: { site: SiteData }) {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return null

  return <ProjectContent slug={slug} site={site} />
}

function ProjectContent({ slug, site }: { slug: string; site: SiteData }) {
  const { project, loading, error } = useProject(slug)

  if (loading) {
    return <div className="container"><p className="muted">{site.ui.loading}</p></div>
  }

  if (error || !project) {
    return (
      <div className="container">
        <p className="muted">{site.ui.projectNotFound}</p>
        <Link to="/#projects">Back</Link>
      </div>
    )
  }

  return <ProjectDetail project={project} labels={site.ui} />
}
