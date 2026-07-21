import { useParams, Link } from 'react-router-dom'
import { useProject } from '../hooks/useProject'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import BlockRenderer from '../components/work-detail/BlockRenderer'
import styles from './WorkDetailPage.module.css'

export default function WorkDetailPage() {
  useRevealOnScroll()
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return null

  return <WorkDetailContent slug={slug} />
}

function WorkDetailContent({ slug }: { slug: string }) {
  const { project, loading, error } = useProject(slug)

  if (loading) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>Loading...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>Project not found.</p>
        <Link to="/work">← Back to Work</Link>
      </div>
    )
  }

  return (
    <article className={styles.article}>
      <div className="container">
        <Link to="/work" className={styles.back}>← Work</Link>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.meta}>
          <span className={styles.year}>{project.year}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
        <div className={styles.blocks}>
          {project.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} slug={slug} />
          ))}
        </div>
      </div>
    </article>
  )
}
