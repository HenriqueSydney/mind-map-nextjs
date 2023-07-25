import { ActivityReservation } from '@prisma/client'

import { Divider } from '@/components/Divider'
import { InformationItem } from '../InformationItem'

import { datePtBrFormatter } from '@/utils/date'
import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'

interface IActivityInfoInfoProps {
  activities: ActivityReservation[]
}

export function ActivityInfo({ activities }: IActivityInfoInfoProps) {
  if (activities.length === 0) {
    return
  }

  return (
    <>
      <div className={styles.typeContainer}>
        <h3>Atividades</h3>
        <Divider />
      </div>

      {activities.map((activity) => {
        const date = `${datePtBrFormatter(new Date(activity.date))}`

        return (
          <>
            <br />
            <InformationItem label="Atividade" description={activity.id} />
            <InformationItem label="Dia" description={date} />
            <InformationItem label="Horário" description="10:00 às 17:00" />
            <InformationItem
              label="Adultos"
              description={String(activity.quantityOfAdults)}
            />
            <InformationItem
              label="Crianças"
              description={String(activity.quantityOfChilds)}
            />
            <InformationItem
              label="Adultos"
              description={String(activity.quantityOfSeniors)}
            />
            <InformationItem
              label="Valor total pago"
              description={priceFormatter.format(activity.totalPrice)}
            />
          </>
        )
      })}
    </>
  )
}
