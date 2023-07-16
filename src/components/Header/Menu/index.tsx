'use client'

import { useState } from 'react'
import { Session } from 'next-auth'

import { useRouter } from 'next/navigation'

import { signOut } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faList,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

import { CartButton } from '../../Buttons/CartButton'
import { ButtonIcon } from '../../Buttons/ButtonIcon'
import { LoginModal } from '../LoginModal/LoginModal'
import { GetReservationInfoModal } from '../GetReservationInfoModal/GetReservationInfoModal'

import styles from './styles.module.scss'
import { Modal } from '@/components/Modal/Modal'
import { useNavigationEvent } from '@/hooks/useNavigationEvent'

interface IMenuProps {
  session: Session | null
}

export function Menu({ session }: IMenuProps) {
  const [isShown, setIsShown] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSearchReservationModalOpen, setIsSearchReservationModalOpen] =
    useState(false)
  const router = useRouter()

  function handleGoToUserReservations() {
    router.push('/')
  }

  function handleGoToCart() {
    router.push('/cart')
  }

  function handleOpenLoginModalVisibility() {
    setIsShown((state) => !state)
    setIsLoginModalOpen((state) => !state)
  }

  function handleSearchReservationModalVisibility() {
    setIsShown((state) => !state)
    setIsSearchReservationModalOpen((state) => !state)
  }

  useNavigationEvent(() => {
    setIsLoginModalOpen(false)
    setIsSearchReservationModalOpen(false)
  })

  return (
    <div className={styles.menu}>
      <button
        onClick={() => setIsShown(!isShown)}
        className={styles['menu-toggle']}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul
        className={`${styles['icons-container']} ${styles['menu-items']} ${
          isShown && styles.show
        }`}
      >
        <li>
          <Modal
            triggerChildren={
              <ButtonIcon
                variant="SECONDARY"
                title="Consultar reserva"
                icon={<FontAwesomeIcon icon={faList} />}
                onClick={handleSearchReservationModalVisibility}
              />
            }
            contentChildren={<GetReservationInfoModal />}
            isModalOpen={isSearchReservationModalOpen}
            handleModalVisibility={handleSearchReservationModalVisibility}
          />
        </li>
        <li>
          <CartButton onClick={handleGoToCart} />
        </li>
        {session ? (
          <>
            <li>
              <div>
                <ButtonIcon
                  variant="SECONDARY"
                  title="Minhas reservas"
                  icon={<FontAwesomeIcon icon={faUser} />}
                  onClick={handleGoToUserReservations}
                />
              </div>
            </li>
            <li>
              <div>
                <ButtonIcon
                  variant="SECONDARY"
                  title="Sair"
                  icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                  onClick={() => signOut({ callbackUrl: '/' })}
                />
              </div>
            </li>
          </>
        ) : (
          <li>
            <div>
              <Modal
                triggerChildren={
                  <ButtonIcon
                    variant="SECONDARY"
                    title="Entrar"
                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                    onClick={handleOpenLoginModalVisibility}
                  />
                }
                contentChildren={<LoginModal />}
                isModalOpen={isLoginModalOpen}
                handleModalVisibility={handleOpenLoginModalVisibility}
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
