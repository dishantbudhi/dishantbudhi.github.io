import { useState } from 'react'
import type {
  MediaProfileBlock as MediaProfileBlockData,
  MediaProfileItem,
} from '../../types'
import styles from './MediaProfileBlock.module.css'

interface MediaProfileBlockProps {
  profile: MediaProfileBlockData
}

function MediaItemCard({ item, platform }: { item: MediaProfileItem; platform: MediaProfileBlockData['platform'] }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(item.image) && !imageFailed

  return (
    <a
      className={`${styles.item} ${imageFailed ? styles.imageMissing : ''}`}
      href={item.href}
      target="_blank"
      rel="noreferrer"
    >
      {showImage && (
        <img
          src={item.image}
          alt={`${item.title} artwork`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      {platform === 'spotify' && !showImage && (
        <span className={styles.coverFallback} aria-hidden="true" />
      )}
      <span className={styles.itemText}>
        <strong>{item.title}</strong>
        {item.subtitle && <small>{item.subtitle}</small>}
      </span>
    </a>
  )
}

export default function MediaProfileBlock({ profile }: MediaProfileBlockProps) {
  const platformLabel = profile.platform === 'spotify' ? 'Spotify' : 'Letterboxd'

  return (
    <section className={styles.section} data-platform={profile.platform}>
      <div className={styles.heading}>
        <h2 className={styles.collectionLabel}>
          <a
            className={styles.platformLink}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`View profile on ${platformLabel}`}
          >
            {profile.collectionLabel}
          </a>
        </h2>
      </div>

      {profile.items && profile.items.length > 0 && (
        <div className={styles.collection}>
          <div className={`${styles.items} ${profile.items.some((item) => item.image) ? styles.posters : ''}`}>
            {profile.items.map((item) => (
              <MediaItemCard
                key={`${item.title}-${item.href}`}
                item={item}
                platform={profile.platform}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
