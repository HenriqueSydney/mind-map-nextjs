import Link from 'next/link'
import Image from 'next/image'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import { Menu } from './Menu'

import styles from './styles.module.scss'

import logo from '../../../public/logo.png'

export async function Header() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <div className={`${styles.header}`}></div>
      <header className={`${styles.header} ${styles['fixed-header']}`}>
        <Link href="/">
          <Image
            className={styles.logo}
            src={logo}
            alt="Chapada do Indaia Logo"
          />
        </Link>
        <Menu session={session} />
      </header>
    </>
  )
}
