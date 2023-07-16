import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ISectionContainerProps {
  children: ReactNode
}

export function SectionContainer({ children }: ISectionContainerProps) {
  return <section className={styles['section-container']}>{children}</section>
}
