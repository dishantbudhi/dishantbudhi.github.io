import type { ContentBlock } from './blocks'

export interface ProjectMeta {
  slug: string
  title: string
  year: number
  tags: string[]
  thumbnail: string
  summary: string
}

export interface ProjectFull extends ProjectMeta {
  blocks: ContentBlock[]
}
