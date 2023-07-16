import Link from 'next/link'

import { ptBrNumberFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'

interface ProductCardProps {
  data: {
    id: string
    name: string
    excerpt: string
    price: number
    img: string
    imgAlt: string
  }
}

export function ProductCard({ data }: ProductCardProps) {
  const { id, name, excerpt, price, img, imgAlt } = data

  const formattedPrice = ptBrNumberFormatter.format(price)

  return (
    <Link href={`/activities/${id}`} className={styles.container}>
      <img src={img} alt={imgAlt} />

      <div className={styles['tag-container']}>
        <h1 className={styles['product-name']}>{name}</h1>
      </div>
      <div className={styles['title-description-container']}>
        <span className={styles['product-description']}>{excerpt}</span>
      </div>

      <div className={styles['price-container']}>
        {price === 0 ? (
          <strong className={styles['more-info']}>
            Clique para mais informações
          </strong>
        ) : (
          <span className={styles.price}>
            <span className={styles.currency}>R$</span>
            {formattedPrice}
          </span>
        )}
      </div>
    </Link>
  )
}
