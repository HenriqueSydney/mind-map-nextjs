'use client'

import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import {
  faArrowLeft,
  faHome,
  faSadTear,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './not-found.module.scss'
import { SectionContainer } from '@/components/SectionContainer'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const navigation = useRouter()

  function handleGoBack() {
    navigation.back()
  }

  function handleGoHome() {
    navigation.push('/')
  }

  return (
    <body className={styles.body}>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <SectionContainer>
          <div className={styles.content}>
            <main className={styles.main}>
              <h1>Ops, esta página não foi encontrada</h1>
              <span>
                Parece que você foi direcionado para uma página não existente.
                Tente voltar para a página anterior ou acessar a página inicial
              </span>

              <div className={styles.buttons}>
                <ButtonIcon
                  title="Voltar"
                  icon={<FontAwesomeIcon icon={faArrowLeft} />}
                  onClick={handleGoBack}
                  variant="SECONDARY"
                />

                <ButtonIcon
                  title="Ir para página inicial"
                  icon={<FontAwesomeIcon icon={faHome} />}
                  onClick={handleGoHome}
                  variant="SECONDARY"
                />
              </div>
            </main>
            <aside className={styles.aside}>
              <span>4</span>
              <FontAwesomeIcon icon={faSadTear} />
              <span>4</span>
            </aside>
          </div>
        </SectionContainer>
      </div>
    </body>
  )
}
