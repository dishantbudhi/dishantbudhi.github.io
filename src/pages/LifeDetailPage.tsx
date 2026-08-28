import { useParams, Link } from 'react-router-dom'
import { useHobby } from '../hooks/useHobby'
import DetailPage from '../components/common/DetailPage'
import type { SiteData } from '../types'

export default function LifeDetailPage({ site }: { site: SiteData }) {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return null

  return <LifeDetailContent slug={slug} site={site} />
}

function LifeDetailContent({ slug, site }: { slug: string; site: SiteData }) {
  const { hobby, loading, error } = useHobby(slug)

  if (loading) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>{site.ui.loading}</p>
      </div>
    )
  }

  if (error || !hobby) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>{site.ui.interestNotFound}</p>
        <Link to="/professional#interests">{site.ui.backToPersonal}</Link>
      </div>
    )
  }

  return (
    <DetailPage
      backHref="/professional#interests"
      backLabel={site.ui.backToPersonal}
      title={hobby.title}
      summary={hobby.summary}
      images={hobby.detailImages}
      blocks={hobby.blocks}
      slug={hobby.slug}
      labels={site.ui}
      layout="interest"
    />
  )
}
