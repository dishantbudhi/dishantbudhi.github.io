import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { ImageAsset, SiteData } from '../../types'
import PhotoLightbox from './PhotoLightbox'
import styles from './PhotoGrid.module.css'

interface PhotoGridProps {
  images: ImageAsset[]
  labels: SiteData['ui']
  variant?: 'compact' | 'detail'
  detailSize?: 'page' | 'column'
  showIndicators?: boolean
}

export default function PhotoGrid({
  images,
  labels,
  variant = 'compact',
  detailSize = 'page',
  showIndicators = false,
}: PhotoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set())
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveIndex = () => {
    const grid = gridRef.current
    if (!grid || grid.children.length === 0) return

    const closestIndex = Array.from(grid.children).reduce((closest, child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - grid.scrollLeft)
      const closestDistance = Math.abs((grid.children[closest] as HTMLElement).offsetLeft - grid.scrollLeft)
      return distance < closestDistance ? index : closest
    }, 0)

    setActiveIndex(closestIndex)
  }

  const scrollToImage = (index: number) => {
    const grid = gridRef.current
    const image = grid?.children[index] as HTMLElement | undefined
    if (!grid || !image) return

    grid.scrollTo({ left: image.offsetLeft, behavior: 'smooth' })
  }

  return (
    <>
      <div
        ref={gridRef}
        className={`${styles.grid} ${variant === 'detail' ? styles.detail : styles.compact} ${variant === 'detail' && detailSize === 'column' ? styles.columnDetail : ''} ${showIndicators ? styles.dotNavigation : ''}`}
        onScroll={showIndicators ? updateActiveIndex : undefined}
      >
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
      {showIndicators && images.length > 1 && (
        <div className={styles.indicator} aria-label={`Image ${activeIndex + 1} of ${images.length}`}>
          {images.map((image, index) => (
            <button
              key={`${image.src}-indicator-${index}`}
              type="button"
              className={index === activeIndex ? styles.active : ''}
              onClick={() => scrollToImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
      <PhotoLightbox
        image={selectedImage}
        labels={labels}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
