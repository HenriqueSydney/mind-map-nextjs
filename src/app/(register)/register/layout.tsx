import React from 'react'

import styles from './layout.module.scss'

export const metadata = {
  title: 'Simply Nature | Register',
  description: 'SIMPLY NATURE INN LTDA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}></aside>
      {children}
    </div>
  )
}
