import ReactMarkdown from 'react-markdown'
import type { TextBlock as TextBlockType } from '../../types'
import styles from './TextBlock.module.css'

export default function TextBlock({ content }: Pick<TextBlockType, 'content'>) {
  return (
    <div className={styles.text}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
