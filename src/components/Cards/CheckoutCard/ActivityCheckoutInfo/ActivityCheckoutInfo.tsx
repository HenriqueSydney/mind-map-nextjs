import { ActivityCartData } from '@/context/CartContext'

import { datePtBrFormatter } from '@/utils/date'

import styles from './styles.module.scss'

interface ICheckoutCard {
  activityInCart: ActivityCartData
}

export function ActivityCheckoutInfo({ activityInCart }: ICheckoutCard) {
  const formattedReservationDate = datePtBrFormatter(
    new Date(activityInCart.date),
  )

  const summaries = []
  if (activityInCart.quantityOfAdults > 0) {
    summaries.push(`${activityInCart.quantityOfAdults} adultos`)
  }
  if (activityInCart.quantityOfChildren > 0) {
    summaries.push(`${activityInCart.quantityOfChildren} crianças`)
  }
  if (activityInCart.quantityOfSeniors > 0) {
    summaries.push(`${activityInCart.quantityOfSeniors} idosos`)
  }

  const summaryTicketString = summaries.join(', ')

  return (
    <div className={styles.container}>
      <h1>Atividade</h1>

      <div className={styles.info}>
        <label>Nome:</label>
        <span>{activityInCart.title}</span>
      </div>

      <div className={styles.info}>
        <label>Data da Reserva:</label>
        <span>{formattedReservationDate}</span>
      </div>
      <div className={styles.info}>
        <label>Ingressos:</label>
        <span>{summaryTicketString}</span>
      </div>

      <div className={styles.info}>
        <label>Horário:</label>
        <span>{activityInCart.hourInterval}</span>
      </div>
    </div>
  )
}
