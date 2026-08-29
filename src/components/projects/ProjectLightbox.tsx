import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { ImageAsset, SiteData } from '../../types'
import { useModal } from '../../hooks/useModal'
import BasilIcon from '../ui/BasilIcon'
import styles from './ProjectLightbox.module.css'

interface ProjectLightboxProps {
  images: ImageAsset[]
  activeIndex: number | null
  labels: SiteData['ui']
  onSelect: (index: number) => void
  onClose: () => void
}

export default function ProjectLightbox({
  images,
  activeIndex,
  labels,
  onSelect,
  onClose,
}: ProjectLightboxProps) {
  const image = activeIndex === null ? null : images[activeIndex]
  const { closeRef } = useModal(Boolean(image), onClose)

  useEffect(() => {
    if (activeIndex === null || images.length < 2) return

    const selectFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onSelect((activeIndex - 1 + images.length) % images.length)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onSelect((activeIndex + 1) % images.length)
      }
    }

    document.addEventListener('keydown', selectFromKeyboard)
    return () => document.removeEventListener('keydown', selectFromKeyboard)
  }, [activeIndex, images.length, onSelect])

  if (!image || activeIndex === null) return null

  const hasMultipleImages = images.length > 1
  const previousIndex = (activeIndex - 1 + images.length) % images.length
  const nextIndex = (activeIndex + 1) % images.length

  const imageStyle = {
    '--image-position': image.position ?? 'center',
  } as CSSProperties

  return createPortal(
    <div className={styles.overlay} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.lightbox}
        role="dialog"
        aria-modal="true"
        aria-label={labels.photoDialogLabel}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label={labels.closePhoto}
          onClick={onClose}
        >
          <BasilIcon name="cross" />
        </button>
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.previous}`}
              aria-label="Previous image"
              onClick={() => onSelect(previousIndex)}
            >
              <BasilIcon name="arrowLeft" />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              aria-label="Next image"
              onClick={() => onSelect(nextIndex)}
            >
              <BasilIcon name="arrowLeft" className={styles.nextIcon} />
            </button>
          </>
        )}
        <figure className={styles.figure}>
          <img src={image.src} alt={image.alt} style={imageStyle} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      </section>
    </div>,
    document.body,
  )
}
