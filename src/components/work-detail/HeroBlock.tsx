import type { HeroBlock as HeroBlockType } from '../../types'
import styles from './HeroBlock.module.css'

interface HeroBlockProps extends Pick<HeroBlockType, 'src' | 'alt'> {
  slug: string
}

export default function HeroBlock({ src, alt, slug }: HeroBlockProps) {
  const resolvedSrc = `/data/projects/${slug}/${src}`

  return (
    <div className={styles.hero}>
      <img src={resolvedSrc} alt={alt ?? ''} className={styles.image} />
    </div>
  )
}
