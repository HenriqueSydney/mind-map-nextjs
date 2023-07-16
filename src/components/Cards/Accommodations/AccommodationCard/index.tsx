import Link from 'next/link'

import { AccommodationData } from '../../../../dtos/accommodations'

import styles from './styles.module.scss'
import { FacilitiesInfo } from '../../../FacilitiesInfo'

interface AccommodationCardProps {
  data: AccommodationData
  oddOrEven: 'odd' | 'even'
}

export function AccommodationCard({ data }: AccommodationCardProps) {
  const { id, name, description, facilities, price, img } = data

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(price)

  return (
    <Link href={`/accommodations/${id}`} className={styles.container}>
      <img src={img} alt="Xícara de Café" />

      <div className={styles['info-container']}>
        <div className={styles.description}>
          <h1 className={styles['accommodation-name']}>{name}</h1>

          <div
            className={styles['accommodation-description']}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
        <div className={styles['additional-info']}>
          <div className={styles.facilities}>
            <strong>Esta acomodação possui:</strong>

            <div className={styles['facilities-list']}>
              {facilities?.map(({ title, icon }) => (
                <FacilitiesInfo key={title} title={title} icon={icon} />
              ))}
            </div>
          </div>

          <div className={styles['price-container']}>
            <span className={styles.price}>
              <span className={styles.currency}>R$</span>
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
