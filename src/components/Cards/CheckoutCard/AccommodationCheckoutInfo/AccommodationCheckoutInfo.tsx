import { AccommodationCartData } from '@/context/CartContext'

import { datePtBrFormatter } from '@/utils/date'

import styles from './styles.module.scss'

interface ICheckoutCard {
  accommodationInCart: AccommodationCartData
}

export function AccommodationCheckoutInfo({
  accommodationInCart,
}: ICheckoutCard) {
  const formattedCheckIn = datePtBrFormatter(
    new Date(accommodationInCart.checkInDate),
  )
  const formattedCheckOut = datePtBrFormatter(
    new Date(accommodationInCart.checkOutDate),
  )

  return (
    <div className={styles.container}>
      <h1>Acomodação</h1>

      <div className={styles.info}>
        <label>Nome:</label>
        <span>{accommodationInCart.title}</span>
      </div>

      <div className={styles.info}>
        <label>CheckIn:</label>
        <span>{formattedCheckIn}</span>
      </div>

      <div className={styles.info}>
        <label>CheckOut:</label>
        <span>{formattedCheckOut}</span>
      </div>

      <div className={styles.info}>
        <label>Qtd. quartos:</label>
        <span>{accommodationInCart.quantityOfAccommodations}</span>
      </div>
    </div>
  )
}
