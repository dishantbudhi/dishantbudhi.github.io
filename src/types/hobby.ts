import type { ContentBlock } from './blocks'

export interface HobbyMeta {
  slug: string
  title: string
  cover: string
  summary: string
}

export interface HobbyFull extends HobbyMeta {
  blocks: ContentBlock[]
}
