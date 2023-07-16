import { useRouter } from 'next/navigation'
import { CartData } from '@/context/CartContext'

import { Divider } from '@/components/Divider'
import { CheckoutCard } from '@/components/Cards/CheckoutCard'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'

import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'

interface IFilledCart {
  cart: CartData[]
  totalCart: number
}

export function FilledCart({ cart, totalCart }: IFilledCart) {
  const navigation = useRouter()

  const sortedCart = cart.sort((a, b) => {
    if (a.type === 'accommodation' && b.type === 'activity') {
      return -1 // a deve vir antes de b
    } else if (a.type === 'activity' && b.type === 'accommodation') {
      return 1 // a deve vir depois de b
    } else {
      if (a.subtotal < b.subtotal) {
        return -1
      } else if (a.subtotal > b.subtotal) {
        return 1
      } else {
        return 0
      }
    }
  })

  return (
    <div className={styles.container}>
      {sortedCart.map((item) => (
        <CheckoutCard key={item.id} itemInCart={item} />
      ))}
      <Divider title="TOTAL" />
      <div className={styles.total}>
        <strong>{priceFormatter.format(totalCart)}</strong>
      </div>

      <ButtonIcon
        title="Procurar mais Lazer e Diversão"
        onClick={() => navigation.push('/')}
      />
    </div>
  )
}
