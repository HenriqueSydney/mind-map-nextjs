import styles from './styles.module.scss'

interface ITextWithLabel {
  title: string
  text: string
}

export function TextWithLabel({ title, text }: ITextWithLabel) {
  return (
    <div className={styles.container}>
      <label>{title}</label>
      <p>{text}</p>
    </div>
  )
}
