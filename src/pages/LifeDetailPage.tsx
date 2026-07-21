import { useParams, Link } from 'react-router-dom'
import { useHobby } from '../hooks/useHobby'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import BlockRenderer from '../components/work-detail/BlockRenderer'
import styles from './LifeDetailPage.module.css'

export default function LifeDetailPage() {
  useRevealOnScroll()
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return null

  return <LifeDetailContent slug={slug} />
}

function LifeDetailContent({ slug }: { slug: string }) {
  const { hobby, loading, error } = useHobby(slug)

  if (loading) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>Loading...</p>
      </div>
    )
  }

  if (error || !hobby) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: '48px 0' }}>Not found.</p>
        <Link to="/life">← Back to Life</Link>
      </div>
    )
  }

  return (
    <article className={styles.article}>
      <div className="container">
        <Link to="/life" className={styles.back}>← Life</Link>
        <h1 className={styles.title}>{hobby.title}</h1>
        <p className={styles.summary}>{hobby.summary}</p>
        <div className={styles.blocks}>
          {hobby.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} slug={slug} />
          ))}
        </div>
      </div>
    </article>
  )
}
