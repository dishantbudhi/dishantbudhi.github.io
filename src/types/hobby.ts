import type { ContentBlock } from './blocks'
import type { ImageAsset } from './media'

export interface HobbyMeta {
  slug: string
  title: string
  summary: string
  previewImage: ImageAsset
  detailImages: ImageAsset[]
}

export interface HobbyFull extends HobbyMeta {
  blocks: ContentBlock[]
}
