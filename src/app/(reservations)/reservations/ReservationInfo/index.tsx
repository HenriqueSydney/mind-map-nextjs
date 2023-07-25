import {
  AccommodationReservation,
  ActivityReservation,
  Order,
  User,
} from '@prisma/client'

import { InformationItem } from './InformationItem'
import { AccommodationInfo } from './AccommodationInfo'
import { ActivityInfo } from './ActivityInfo'
import { ReservationObservations } from './ReservationObservations'
import { ReservationContactAndHelp } from './ReservationContactAndHelp'

import styles from './styles.module.scss'

export type ReservationInfo = Order & {
  AccommodationsReservations: AccommodationReservation[]
  ActivityReservations: ActivityReservation[]
  User?: User
}

interface ReservationInfoProps {
  reservation: ReservationInfo
}

export function ReservationInfo({ reservation }: ReservationInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Dados da Reserva</h1>
        <InformationItem
          label="Código da Reserva"
          description={reservation.id}
        />
        <InformationItem
          label="Reserva realizada por"
          description={reservation.guest_name}
        />
        <InformationItem
          label="Email para contato"
          description={reservation.email}
        />
        <h2>Detalhes da Reserva</h2>
        <AccommodationInfo
          accommodations={reservation.AccommodationsReservations}
        />

        <ActivityInfo activities={reservation.ActivityReservations} />
      </div>
      <div className={styles.content}>
        <h1>Observações e Orientações</h1>
        <ReservationObservations />
        <ReservationContactAndHelp />
      </div>
    </div>
  )
}
