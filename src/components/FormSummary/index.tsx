import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'
import { Divider } from '../Divider'

interface IFormSummary {
  summary: {
    subtotal: number
    quantityOfDays: number
    quantityOfAccommodations: number
    dailyRate: number
  }
}

export function FormSummary({
  summary: { dailyRate, quantityOfAccommodations, quantityOfDays, subtotal },
}: IFormSummary) {
  const formattedDailyRate = priceFormatter.format(dailyRate)
  const formattedSubtotal = priceFormatter.format(subtotal)

  return (
    <div className={styles.container}>
      <Divider title="Resumo" />
      <div className={styles['summary-container']}>
        <div className={styles.content}>
          <label>Valor da diária:</label>
          <strong>{formattedDailyRate}</strong>
        </div>
        <div className={styles.content}>
          <label>Quantidade de dias:</label>
          <strong>{quantityOfDays}</strong>
        </div>
        <div className={styles.content}>
          <label>Quantidade de quartos:</label>
          <strong>{quantityOfAccommodations}</strong>
        </div>
        <Divider />
        <div className={styles.content}>
          <strong>Subtotal:</strong>
          <strong>{formattedSubtotal}</strong>
        </div>
      </div>
    </div>
  )
}
