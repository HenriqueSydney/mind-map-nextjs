import QRCode from 'react-qr-code'

import { SectionContainer } from '@/components/SectionContainer'
import { Divider } from '@/components/Divider'
import { ReservationInfo } from '../../ReservationInfo'

import styles from './page.module.scss'

interface ConfirmationProps {
  params: {
    id: string
  }
}

// http://localhost:3000/reservations/confirmation/a2ae1bf8-1d01-48eb-93d6-3d86c537f459
export default async function Confirmation({
  params: { id },
}: ConfirmationProps) {
  const response = await fetch(
    `http://localhost:3000/api/reservation?order_id=${id}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  )

  const reservationData = await response.json()
  console.log(reservationData)

  return (
    <main className={styles.container}>
      <SectionContainer>
        <div className={styles.confirmation}>
          <Divider title="Confirmação de Reserva" titleType="header" />
          <strong>Sucesso! Sua reserva foi confirmada!</strong>
          <span>Você receberá um e-mail de confirmação em breve</span>
          <QRCode
            size={256}
            style={{
              height: 'auto',
              maxWidth: '250px',
              width: '250px',
              marginTop: 20,
            }}
            value={id}
            viewBox={`0 0 256 256`}
          />
        </div>
        <ReservationInfo reservation={reservationData} />
      </SectionContainer>
    </main>
  )
}
