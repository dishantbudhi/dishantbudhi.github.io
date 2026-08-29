import type { CSSProperties } from 'react'
import styles from './BasilIcon.module.css'

const sources = {
  linkedin: '/icons/basil/linkedin.svg',
  stack: '/icons/basil/stack.svg',
  envelope: '/icons/basil/envelope.svg',
  fileDownload: '/icons/basil/file-download.svg',
  arrowUp: '/icons/basil/arrow-up.svg',
  arrowLeft: '/icons/basil/arrow-left.svg',
  cross: '/icons/basil/cross.svg',
  location: '/icons/basil/location.svg',
  home: '/icons/basil/home.svg',
  user: '/icons/basil/user.svg',
  folder: '/icons/basil/folder.svg',
  plus: '/icons/basil/plus.svg',
  gamepad: '/icons/basil/gamepad.svg',
  history: '/icons/basil/history.svg',
  music: '/icons/basil/music.svg',
  video: '/icons/basil/video.svg',
  palette: '/icons/basil/palette.svg',
  book: '/icons/basil/book.svg',
  university: '/icons/basil/university.svg',
  lightbulb: '/icons/basil/lightbulb.svg',
  heartbeat: '/icons/basil/heartbeat.svg',
  fire: '/icons/basil/fire.svg',
  processor: '/icons/basil/processor.svg',
  github: '/icons/github.svg',
} as const

export type BasilIconName = keyof typeof sources

export const contactIconById: Record<string, BasilIconName> = {
  linkedin: 'linkedin',
  github: 'github',
  email: 'envelope',
  resume: 'fileDownload',
}

interface BasilIconProps {
  name: BasilIconName
  className?: string
}

export default function BasilIcon({ name, className = '' }: BasilIconProps) {
  const style = {
    '--basil-icon': `url("${sources[name]}")`,
  } as CSSProperties

  return (
    <span
      className={`${styles.icon} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  )
}
