import styles from './styles.module.scss'

interface DividerProps {
  title?: string
  titleType?: 'text' | 'header'
}

export function Divider({ title, titleType = 'text' }: DividerProps) {
  return (
    <div className={styles.container}>
      {title && titleType === 'text' && <span>{title}</span>}
      {title && titleType === 'header' && <h1>{title}</h1>}
      <div className={styles.divider} />
    </div>
  )
}
