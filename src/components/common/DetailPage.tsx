import { Link } from 'react-router-dom'
import type { ContentBlock, ImageAsset, SiteData } from '../../types'
import BlockRenderer from '../work-detail/BlockRenderer'
import PhotoGrid from '../life/PhotoGrid'
import TagList from './TagList'
import styles from './DetailPage.module.css'

interface DetailPageProps {
  backHref: string
  backLabel: string
  title: string
  summary: string
  eyebrow?: string
  tags?: string[]
  images: ImageAsset[]
  blocks: ContentBlock[]
  slug: string
  labels: SiteData['ui']
  layout?: 'default' | 'interest'
}

export default function DetailPage({
  backHref,
  backLabel,
  title,
  summary,
  eyebrow,
  tags = [],
  images,
  blocks,
  slug,
  labels,
  layout = 'default',
}: DetailPageProps) {
  const gallery = images.length > 0 && (
    <div className={styles.gallery}>
      <PhotoGrid
        images={images}
        labels={labels}
        variant="detail"
        detailSize={layout === 'interest' ? 'column' : 'page'}
      />
    </div>
  )

  const contentBlocks = (
    <div className={styles.blocks}>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} slug={slug} />
      ))}
    </div>
  )

  return (
    <article className={styles.article}>
      <div className="container">
        <Link to={backHref} className={styles.back}>{backLabel}</Link>
        <header className={styles.header}>
          {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
          <h1 className={styles.title}>{title}</h1>
          {tags.length > 0 && <TagList tags={tags} />}
          <p className={styles.summary}>{summary}</p>
        </header>

        {layout === 'interest' ? (
          <div className={styles.interestContent}>
            {gallery}
            {contentBlocks}
          </div>
        ) : (
          <>
            {gallery}
            {contentBlocks}
          </>
        )}
      </div>
    </article>
  )
}
