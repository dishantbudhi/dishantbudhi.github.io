export type TextBlock = {
  type: 'text'
  content: string
}

export type ImageBlock = {
  type: 'image'
  src: string
  caption?: string
}

export type VideoBlock = {
  type: 'video'
  url: string
}

export type HeroBlock = {
  type: 'hero'
  src: string
  alt?: string
}

export type MediaProfileItem = {
  title: string
  href: string
  subtitle?: string
  image?: string
}

export type MediaProfileBlock = {
  type: 'media-profile'
  platform: 'spotify' | 'letterboxd'
  href: string
  collectionLabel: string
  items?: MediaProfileItem[]
}

export type ContentBlock = TextBlock | ImageBlock | VideoBlock | HeroBlock | MediaProfileBlock
