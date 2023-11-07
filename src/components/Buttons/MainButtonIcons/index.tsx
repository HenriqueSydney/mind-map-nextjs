import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  title: string
}

export function MainButtonIcons({ icon, title, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.container} main-button`} {...rest}>
      {icon}
      <strong>{title}</strong>
    </button>
  )
}
