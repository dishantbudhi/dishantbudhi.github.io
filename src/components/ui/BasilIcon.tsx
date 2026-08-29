import type { CSSProperties } from 'react'
import styles from './BasilIcon.module.css'

const sources = {
  linkedin: '/files/admin/icons/linkedin.svg',
  stack: '/files/admin/icons/stack.svg',
  envelope: '/files/admin/icons/envelope.svg',
  fileDownload: '/files/admin/icons/file-download.svg',
  arrowUp: '/files/admin/icons/arrow-up.svg',
  arrowLeft: '/files/admin/icons/arrow-left.svg',
  cross: '/files/admin/icons/cross.svg',
  location: '/files/admin/icons/location.svg',
  home: '/files/admin/icons/home.svg',
  user: '/files/admin/icons/user.svg',
  folder: '/files/admin/icons/folder.svg',
  plus: '/files/admin/icons/plus.svg',
  gamepad: '/files/admin/icons/gamepad.svg',
  history: '/files/admin/icons/history.svg',
  music: '/files/admin/icons/music.svg',
  video: '/files/admin/icons/video.svg',
  palette: '/files/admin/icons/palette.svg',
  book: '/files/admin/icons/book.svg',
  university: '/files/admin/icons/university.svg',
  lightbulb: '/files/admin/icons/lightbulb.svg',
  heartbeat: '/files/admin/icons/heartbeat.svg',
  fire: '/files/admin/icons/fire.svg',
  processor: '/files/admin/icons/processor.svg',
  github: '/files/admin/icons/github.svg',
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
