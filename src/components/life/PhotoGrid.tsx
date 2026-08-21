import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { ImageAsset, SiteData } from '../../types'
import PhotoLightbox from './PhotoLightbox'
import styles from './PhotoGrid.module.css'

interface PhotoGridProps {
  images: ImageAsset[]
  labels: SiteData['ui']
  variant?: 'compact' | 'detail'
  detailSize?: 'page' | 'column'
}

export default function PhotoGrid({
  images,
  labels,
  variant = 'compact',
  detailSize = 'page',
}: PhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set())

  return (
    <>
      <div className={`${styles.grid} ${variant === 'detail' ? styles.detail : styles.compact} ${variant === 'detail' && detailSize === 'column' ? styles.columnDetail : ''}`}>
        {images.map((image, index) => {
          const imageFailed = failedImages.has(index)
          const imageStyle = {
            '--image-position': image.position ?? 'center',
          } as CSSProperties

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={`${styles.item} ${variant === 'detail' ? styles.detailItem : styles.compactItem}`}
              aria-label={image.alt}
              disabled={imageFailed}
              onClick={() => !imageFailed && setSelectedImage(image)}
            >
              {imageFailed ? (
                <span className={styles.placeholder}>
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <small>Photo placeholder</small>
                </span>
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  style={imageStyle}
                  onError={() => {
                    setFailedImages((current) => new Set(current).add(index))
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
      <PhotoLightbox
        image={selectedImage}
        labels={labels}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
