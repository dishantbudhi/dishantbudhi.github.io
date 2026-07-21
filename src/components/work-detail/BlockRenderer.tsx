import type { ContentBlock } from '../../types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import VideoBlock from './VideoBlock'
import HeroBlock from './HeroBlock'

interface BlockRendererProps {
  block: ContentBlock
  slug: string
}

export default function BlockRenderer({ block, slug }: BlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.content} />
    case 'image':
      return <ImageBlock src={block.src} caption={block.caption} slug={slug} />
    case 'video':
      return <VideoBlock url={block.url} />
    case 'hero':
      return <HeroBlock src={block.src} alt={block.alt} slug={slug} />
  }
}
