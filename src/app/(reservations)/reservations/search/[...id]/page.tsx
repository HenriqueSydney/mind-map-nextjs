import QRCode from 'react-qr-code'

import { SectionContainer } from '@/components/SectionContainer'
import { Divider } from '@/components/Divider'

import styles from './page.module.scss'
import { ReservationInfo } from '../../ReservationInfo'
import { ReservationNotFound } from './ReservationNotFound'

interface ConfirmationProps {
  params: {
    id: [string, string]
  }
}

// http://localhost:3000/reservations/confirmation/a2ae1bf8-1d01-48eb-93d6-3d86c537f459
export default async function Confirmation({
  params: { id },
}: ConfirmationProps) {
  const [reservationCode, encodedEmail] = id

  const email = decodeURIComponent(encodedEmail)

  if (!email || !reservationCode) {
    return <ReservationNotFound />
  }

  const response = await fetch(
    `http://localhost:3000/api/reservation?order_id=${reservationCode}`,
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  )

  const reservationData: ReservationInfo = await response.json()
  console.log(reservationData)

  if (!reservationData) {
    return <ReservationNotFound />
  }

  if (reservationData.email !== email) {
    return <ReservationNotFound />
  }

  return (
    <main className={styles.container}>
      <SectionContainer>
        <div className={styles.confirmation}>
          <Divider title="Informações de Reserva" titleType="header" />
          <strong>Reserva Confirmada!</strong>
          <QRCode
            size={256}
            style={{
              height: 'auto',
              maxWidth: '250px',
              width: '250px',
              marginTop: 20,
            }}
            value={reservationCode}
            viewBox={`0 0 256 256`}
          />
        </div>
        <ReservationInfo reservation={reservationData} />
      </SectionContainer>
    </main>
  )
}
