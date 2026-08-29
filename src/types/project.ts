import type { ImageAsset } from './media'

export interface ProjectSection {
  content: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectFull {
  slug: string
  title: string
  year: number
  githubHref: string
  projectLink?: ProjectLink
  detailImages: ImageAsset[]
  sections: ProjectSection[]
}
