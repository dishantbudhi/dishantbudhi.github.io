import type { ImageBlock as ImageBlockType } from '../../types'
import styles from './ImageBlock.module.css'

interface ImageBlockProps extends Pick<ImageBlockType, 'src' | 'caption'> {
  slug: string
}

export default function ImageBlock({ src, caption, slug }: ImageBlockProps) {
  const resolvedSrc = `/data/projects/${slug}/${src}`

  return (
    <figure className={styles.figure}>
      <img src={resolvedSrc} alt={caption ?? ''} className={styles.image} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
