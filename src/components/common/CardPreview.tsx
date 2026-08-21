import type { CSSProperties } from 'react'
import type { ImageAsset } from '../../types'
import styles from './CardPreview.module.css'

interface CardPreviewProps {
  image: ImageAsset
  eyebrow?: string
}

export default function CardPreview({ image, eyebrow }: CardPreviewProps) {
  const imageStyle = {
    '--image-position': image.position ?? 'center',
  } as CSSProperties

  return (
    <div className={styles.preview}>
      <img src={image.src} alt={image.alt} className={styles.image} style={imageStyle} />
      <span className={styles.scrim} aria-hidden="true" />
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
    </div>
  )
}
