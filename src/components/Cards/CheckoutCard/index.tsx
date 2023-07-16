import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { CartContext, CartData } from '@/context/CartContext'

import { AccommodationCheckoutInfo } from './AccommodationCheckoutInfo/AccommodationCheckoutInfo'

import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'
import { ActivityCheckoutInfo } from './ActivityCheckoutInfo/ActivityCheckoutInfo'

interface ICheckoutCard {
  itemInCart: CartData
}

export function CheckoutCard({ itemInCart }: ICheckoutCard) {
  const formattedSubtotal = priceFormatter.format(itemInCart.subtotal)

  const { removeItemFromCart } = useContext(CartContext)

  function handleRemoveItemFromCart() {
    removeItemFromCart(itemInCart)
  }

  return (
    <div className={styles.container}>
      <div className={styles['icons-container']}>
        <button>
          <FontAwesomeIcon icon={faPen} className={styles.edit} />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={styles.trash}
            onClick={handleRemoveItemFromCart}
          />
        </button>
      </div>
      <img src="/banner.jpg" alt="" />
      <div>
        {itemInCart.type === 'accommodation' && itemInCart.accommodation && (
          <AccommodationCheckoutInfo
            accommodationInCart={itemInCart.accommodation}
          />
        )}

        {itemInCart.type === 'activity' && itemInCart.activity && (
          <ActivityCheckoutInfo activityInCart={itemInCart.activity} />
        )}
      </div>
      <div className={styles.subtotal}>
        <strong>{formattedSubtotal}</strong>
      </div>
    </div>
  )
}
