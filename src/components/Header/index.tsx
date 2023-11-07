import Link from 'next/link'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { Menu } from './Menu'

export async function Header() {
  const session = await getServerSession(authOptions)
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header} ${styles['fixed-header']}`}>
        <Link href="/">
          <div className={`${styles.logoContainer}`}>
            <FontAwesomeIcon icon={faBrain} size="3x" />
            <strong>MIND MAP</strong>
          </div>
        </Link>
        <Menu session={session} />
      </div>
    </header>
  )
}
