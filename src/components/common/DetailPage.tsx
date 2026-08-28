import { Link } from 'react-router-dom'
import type { ContentBlock, ImageAsset, SiteData } from '../../types'
import BlockRenderer from '../work-detail/BlockRenderer'
import PhotoGrid from '../life/PhotoGrid'
import BasilIcon from './BasilIcon'
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
  layout?: 'default' | 'interest' | 'project'
}

function isStackBlock(block: ContentBlock) {
  return block.type === 'text' && /^##\s+Stack\s*$/im.test(block.content)
}

function getStackItems(blocks: ContentBlock[], tags: string[]) {
  const stackBlock = blocks.find(isStackBlock)
  const stackText = stackBlock?.type === 'text'
    ? stackBlock.content.replace(/^##\s+Stack\s*/i, '').trim()
    : ''

  return Array.from(new Set([
    ...tags,
    ...stackText
      .split(/\s*·\s*|\n+/)
      .map((item) => item.replace(/^[-*]\s+/, '').trim())
      .filter(Boolean),
  ]))
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
  const projectBlocks = layout === 'project' ? blocks.filter((block) => !isStackBlock(block)) : blocks
  const stackItems = layout === 'project' ? getStackItems(blocks, tags) : []

  const gallery = images.length > 0 && (
    <div className={styles.gallery}>
      <PhotoGrid
        images={images}
        labels={labels}
        variant="detail"
        detailSize={layout === 'interest' ? 'column' : 'page'}
        showIndicators={layout === 'project'}
      />
    </div>
  )

  const contentBlocks = (
    <div className={styles.blocks}>
      {projectBlocks.map((block, index) => (
        <BlockRenderer key={index} block={block} slug={slug} />
      ))}
    </div>
  )

  return (
    <article className={styles.article}>
      <div className="container">
        <Link to={backHref} className={styles.back}>
          <BasilIcon name="arrowLeft" />
          <span>{backLabel.replace(/^←\s*/, '')}</span>
        </Link>
        <header className={styles.header}>
          {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
          <h1 className={styles.title}>{title}</h1>
          {layout !== 'project' && tags.length > 0 && <TagList tags={tags} />}
          {layout !== 'project' && <p className={styles.summary}>{summary}</p>}
        </header>

        {layout === 'project' ? (
          <>
            {gallery && <div className={styles.projectGallery}>{gallery}</div>}
            <div className={styles.projectGrid}>
              {projectBlocks.map((block, index) => (
                <section
                key={index}
                  className={`${styles.projectTile} ${index >= 2 ? styles.wideTile : ''}`}
                data-cursor-glow
                >
                  <BlockRenderer block={block} slug={slug} />
                </section>
              ))}
              {stackItems.length > 0 && (
                <section className={`${styles.projectTile} ${styles.stackTile}`} data-cursor-glow>
                  <p className={styles.tileLabel}>Stack</p>
                  <TagList tags={stackItems} wrap />
                </section>
              )}
            </div>
          </>
        ) : layout === 'interest' ? (
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
