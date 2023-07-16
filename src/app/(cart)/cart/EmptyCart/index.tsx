import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { useRouter } from 'next/navigation'

export function EmptyCart() {
  const navigation = useRouter()

  return (
    <div className={styles['empty-cart-container']}>
      <FontAwesomeIcon
        icon={faShoppingCart}
        size="10x"
        className={styles.cart}
      />
      <FontAwesomeIcon icon={faSadTear} size="4x" className={styles.face} />

      <div className={styles.suggestion}>
        <strong>
          Que pena!! Seu carrinho está vazio! Que tal procurar por uma de nossas
          acomodações ou atividades?
        </strong>

        <ButtonIcon
          title="Procurar por Acomodações e Atividades"
          onClick={() => navigation.push('/')}
        />
      </div>
    </div>
  )
}
