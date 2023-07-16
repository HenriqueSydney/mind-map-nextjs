import { ItemsCounter } from '@/components/ItemsCounter'

import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'

interface OptionsWithCounterProps {
  itemId: string
  title: string
  subtitle: string
  amount: number
}

export function OptionWithCounter({
  itemId,
  title,
  subtitle,
  amount,
}: OptionsWithCounterProps) {
  const formattedAmount =
    amount === 0 ? 'Gratuito' : priceFormatter.format(amount)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>{title}</strong>
        <span>{subtitle}</span>
        <strong>{formattedAmount}</strong>
      </div>

      <ItemsCounter itemId={itemId} />
    </div>
  )
}
