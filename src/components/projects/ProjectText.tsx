import ReactMarkdown from 'react-markdown'
import styles from './ProjectText.module.css'

export default function ProjectText({ content }: { content: string }) {
  return (
    <div className={styles.text}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
