import { useRef, useState } from 'react'

export function useHorizontalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function updateActiveIndex() {
    const track = trackRef.current
    if (!track || track.children.length === 0) return

    const scrollLeft = track.scrollLeft
    const closestIndex = Array.from(track.children).reduce((closest, child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - scrollLeft)
      const closestDistance = Math.abs(
        (track.children[closest] as HTMLElement).offsetLeft - scrollLeft,
      )
      return distance < closestDistance ? index : closest
    }, 0)

    setActiveIndex(closestIndex)
  }

  function scrollToItem(index: number) {
    const item = trackRef.current?.children[index] as HTMLElement | undefined
    item?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return { trackRef, activeIndex, updateActiveIndex, scrollToItem }
}
