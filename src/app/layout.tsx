import React from 'react'

import '../styles/global.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Roboto, Shrikhand } from 'next/font/google'

import { NextAuthProvider } from '@/providers/NextAuthProvider'

import { Header } from '@/components/Header'

import styles from './layout.module.scss'

const shrikhand = Shrikhand({ subsets: ['latin'], weight: ['400'] })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'MindMap',
  description: 'Mapa Mental',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${shrikhand.className} ${roboto.className}`}>
        <NextAuthProvider>
          <Header />
          <div className={styles.container}>{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
