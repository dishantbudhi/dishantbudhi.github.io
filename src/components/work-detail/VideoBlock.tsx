import type { VideoBlock as VideoBlockType } from '../../types'
import styles from './VideoBlock.module.css'

export default function VideoBlock({ url }: Pick<VideoBlockType, 'url'>) {
  return (
    <div className={styles.wrapper}>
      <iframe
        src={url}
        title="Project video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.iframe}
      />
    </div>
  )
}
