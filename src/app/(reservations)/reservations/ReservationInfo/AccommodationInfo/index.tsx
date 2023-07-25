import { AccommodationReservation } from '@prisma/client'

import { Divider } from '@/components/Divider'
import { InformationItem } from '../InformationItem'

import { datePtBrFormatter } from '@/utils/date'
import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'

interface IAccommodationInfoProps {
  accommodations: AccommodationReservation[]
}

export function AccommodationInfo({ accommodations }: IAccommodationInfoProps) {
  if (accommodations.length === 0) {
    return
  }

  return (
    <>
      <div className={styles.typeContainer}>
        <h3>Acomodações</h3>
        <Divider />
      </div>

      {accommodations.map((accommodation) => {
        const checkIn = `${datePtBrFormatter(
          new Date(accommodation.arrivalDate),
        )} às 15:00`
        const checkOut = `${datePtBrFormatter(
          new Date(accommodation.departureDate),
        )} às 11:00`
        return (
          <>
            <br />
            <InformationItem
              label="Acomodação"
              description={accommodation.id}
            />
            <InformationItem label="CheckIn" description={checkIn} />
            <InformationItem label="CheckOut" description={checkOut} />
            <InformationItem
              label="Quantidade de quartos"
              description={String(accommodation.quantity)}
            />
            <InformationItem
              label="Valor total pago"
              description={priceFormatter.format(accommodation.totalPrice)}
            />
          </>
        )
      })}
    </>
  )
}
