import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import { SectionContainer } from '@/components/SectionContainer'
import { Divider } from '@/components/Divider'

import styles from './styles.module.scss'

export function ReservationNotFound() {
  return (
    <main className={styles.container}>
      <SectionContainer>
        <div className={styles.confirmation}>
          <Divider title="Informações de Reserva" titleType="header" />
          <h2>OOPSS! A reserva não foi localizada!</h2>
          <strong>
            Confira o código de reserva e o email informado e tente novamente
          </strong>
          <FontAwesomeIcon icon={faSadTear} size="10x" />
        </div>
      </SectionContainer>
    </main>
  )
}
