import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { ImageAsset, SiteData } from '../../types'
import { useHorizontalCarousel } from '../../hooks/useHorizontalCarousel'
import ProjectLightbox from './ProjectLightbox'
import styles from './ProjectGallery.module.css'

interface ProjectGalleryProps {
  images: ImageAsset[]
  labels: SiteData['ui']
}

export default function ProjectGallery({ images, labels }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set())
  const { trackRef, activeIndex, updateActiveIndex, scrollToItem } = useHorizontalCarousel()

  return (
    <>
      <div ref={trackRef} className={styles.track} onScroll={updateActiveIndex}>
        {images.map((image, index) => {
          const imageFailed = failedImages.has(index)
          const imageStyle = {
            '--image-position': image.position ?? 'center',
            '--image-fit': image.fit ?? 'cover',
          } as CSSProperties

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={styles.item}
              aria-label={image.alt}
              disabled={imageFailed}
              onClick={() => !imageFailed && setSelectedIndex(index)}
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
                  onError={() => setFailedImages((current) => new Set(current).add(index))}
                />
              )}
            </button>
          )
        })}
      </div>

      {images.length > 1 && (
        <div className={styles.indicator} aria-label={`Image ${activeIndex + 1} of ${images.length}`}>
          {images.map((image, index) => (
            <button
              key={`${image.src}-indicator-${index}`}
              type="button"
              className={index === activeIndex ? styles.active : ''}
              onClick={() => scrollToItem(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      <ProjectLightbox
        images={images}
        activeIndex={selectedIndex}
        labels={labels}
        onSelect={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  )
}
