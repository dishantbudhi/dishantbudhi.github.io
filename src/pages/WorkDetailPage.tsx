import { Link, useParams } from 'react-router-dom'
import DetailPage from '../components/common/DetailPage'
import { useProject } from '../hooks/useProject'
import type { SiteData } from '../types'

export default function WorkDetailPage({ site }: { site: SiteData }) {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return null

  return <WorkDetailContent slug={slug} site={site} />
}

function WorkDetailContent({ slug, site }: { slug: string; site: SiteData }) {
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

  return (
    <DetailPage
      backHref="/#projects"
      backLabel="Back"
      title={project.title}
      summary={project.summary}
      eyebrow={String(project.year)}
      tags={project.tags}
      images={project.detailImages}
      blocks={project.blocks}
      slug={project.slug}
      labels={site.ui}
      layout="project"
    />
  )
}
