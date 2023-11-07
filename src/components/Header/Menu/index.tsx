'use client'

import { Session } from 'next-auth'

import { signIn, signOut } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { ButtonIcon } from '../../Buttons/ButtonIcon'
import styles from './styles.module.scss'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

interface IMenuProps {
  session: Session | null
}

export function Menu({ session }: IMenuProps) {
  let firstName = ''
  if (session) {
    const splittedName = session.user.name.split(' ')
    firstName = splittedName[0]
  }
  return (
    <div className={styles.menu}>
      {session ? (
        <div className={styles.userContainer}>
          <strong>
            Olá, {firstName === 'Henrique' ? 'Henrique' : 'Bebê'}!
          </strong>
          <ButtonIcon
            variant="SECONDARY"
            title="Sair"
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={() => signOut({ callbackUrl: '/' })}
          />
        </div>
      ) : (
        <ButtonIcon
          type="button"
          icon={<FontAwesomeIcon icon={faGoogle} />}
          title="Entrar com Google"
          variant="SECONDARY"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        />
      )}
    </div>
  )
}
