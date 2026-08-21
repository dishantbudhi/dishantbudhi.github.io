import { useMemo } from 'react'
import type { ImageAsset } from '../types'

const galleryModules = import.meta.glob(
  '/src/assets/personal/gallery/*.{avif,jpeg,jpg,png,webp}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>

function labelFromPath(path: string) {
  const filename = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Personal photo'
  return filename.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function useGalleryImages(fallback: ImageAsset[]) {
  return useMemo(() => {
    const folderImages = Object.entries(galleryModules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, src]) => {
        const label = labelFromPath(path)
        return { src, alt: label, caption: label } satisfies ImageAsset
      })

    return folderImages.length > 0 ? folderImages : fallback
  }, [fallback])
}
