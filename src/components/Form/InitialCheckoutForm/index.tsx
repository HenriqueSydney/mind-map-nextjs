import { ReactNode } from 'react'

import { Divider } from '@/components/Divider'

import styles from './styles.module.scss'

interface InitialCheckoutFormProps {
  headerTitle: string
  children: ReactNode
}

export function InitialCheckoutForm({
  headerTitle,
  children,
}: InitialCheckoutFormProps) {
  return (
    <>
      <div className={styles.header}>
        <h1>{headerTitle}</h1>
        <Divider />
      </div>
      <div style={{ width: '100%' }}>{children}</div>
    </>
  )
}
