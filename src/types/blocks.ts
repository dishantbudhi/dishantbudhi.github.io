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

export type ContentBlock = TextBlock | ImageBlock | VideoBlock | HeroBlock
