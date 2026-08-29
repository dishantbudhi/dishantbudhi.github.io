import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { ImageAsset, SiteData } from '../../types'
import ProjectLightbox from './ProjectLightbox'
import styles from './ProjectGallery.module.css'

interface ProjectGalleryProps {
  images: ImageAsset[]
  labels: SiteData['ui']
}

export default function ProjectGallery({ images, labels }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set())
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveIndex = () => {
    const track = trackRef.current
    if (!track || track.children.length === 0) return

    const closestIndex = Array.from(track.children).reduce((closest, child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft)
      const closestDistance = Math.abs((track.children[closest] as HTMLElement).offsetLeft - track.scrollLeft)
      return distance < closestDistance ? index : closest
    }, 0)

    setActiveIndex(closestIndex)
  }

  const scrollToImage = (index: number) => {
    const image = trackRef.current?.children[index] as HTMLElement | undefined
    image?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <>
      <div ref={trackRef} className={styles.track} onScroll={updateActiveIndex}>
        {images.map((image, index) => {
          const imageFailed = failedImages.has(index)
          const imageStyle = { '--image-position': image.position ?? 'center' } as CSSProperties

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={styles.item}
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
              onClick={() => scrollToImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      <ProjectLightbox image={selectedImage} labels={labels} onClose={() => setSelectedImage(null)} />
    </>
  )
}
