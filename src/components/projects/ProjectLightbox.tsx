import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { ImageAsset, SiteData } from '../../types'
import { useModal } from '../../hooks/useModal'
import BasilIcon from '../ui/BasilIcon'
import styles from './ProjectLightbox.module.css'

interface ProjectLightboxProps {
  image: ImageAsset | null
  labels: SiteData['ui']
  onClose: () => void
}

export default function ProjectLightbox({ image, labels, onClose }: ProjectLightboxProps) {
  const { closeRef } = useModal(Boolean(image), onClose)

  if (!image) return null

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
        <figure className={styles.figure}>
          <img src={image.src} alt={image.alt} style={imageStyle} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      </section>
    </div>,
    document.body,
  )
}
