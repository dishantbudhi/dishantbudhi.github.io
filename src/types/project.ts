import type { ContentBlock } from './blocks'
import type { ImageAsset } from './media'

export interface ProjectMeta {
  slug: string
  title: string
  year: number
  tags: string[]
  summary: string
  githubHref: string
  previewImage: ImageAsset
  detailImages: ImageAsset[]
}

export interface ProjectFull extends ProjectMeta {
  blocks: ContentBlock[]
}
