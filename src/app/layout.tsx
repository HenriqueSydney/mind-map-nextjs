import React from 'react'

import '../styles/global.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Roboto, Shrikhand } from 'next/font/google'

import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../services/prismic/prismicio'

import ReactQueryClientProvider from '@/providers/queryClientProvider/ReactQueryClientProvider'
import { CartContextProvider } from '@/context/CartContext'
import { NextAuthProvider } from '@/providers/NextAuthProvider'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import styles from './layout.module.scss'

const shrikhand = Shrikhand({ subsets: ['latin'], weight: ['400'] })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Chapada Indaia',
  description: 'CHAPADA DO INDAIA ECOPARQUE LTDA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${shrikhand.className} ${roboto.className}`}>
        <ReactQueryClientProvider>
          <NextAuthProvider>
            <CartContextProvider>
              <Header />
              <div className={styles.container}>{children}</div>
              <Footer />
            </CartContextProvider>
          </NextAuthProvider>
        </ReactQueryClientProvider>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
