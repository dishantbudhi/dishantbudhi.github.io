import type { ImageAsset } from './media'

export interface ProjectSection {
  content: string
}

export interface ProjectFull {
  slug: string
  title: string
  year: number
  githubHref: string
  detailImages: ImageAsset[]
  sections: ProjectSection[]
}
