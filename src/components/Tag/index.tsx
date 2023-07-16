import styles from './styles.module.scss'
interface TagProps {
  title: string
}

export function Tag({ title }: TagProps) {
  return (
    <div className={styles.container}>
      <span>{title.toUpperCase()}</span>
    </div>
  )
}
