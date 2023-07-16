import { AccommodationCard } from './AccommodationCard'

import { SliderForReactChildrens } from '@/components/Sliders/SliderForReactChildrens'

import { fetchAccommodations } from '@/services/prismic/fetchAccommodations'

import styles from './styles.module.scss'

interface AccommodationsProps {
  title: string
  slide?: boolean
  ignoreAccommodation?: string | null
}

export async function Accommodations({
  title,
  slide = false,
  ignoreAccommodation = null,
}: AccommodationsProps) {
  const accommodations = await fetchAccommodations()
  let listOfAccommodations = accommodations
  if (ignoreAccommodation && accommodations) {
    listOfAccommodations = accommodations.filter(
      (accommodation) => accommodation.id !== ignoreAccommodation,
    )
  }

  return (
    <section className={styles['section-container']}>
      <h1>{title}</h1>
      {slide && listOfAccommodations && listOfAccommodations.length > 1 ? (
        <SliderForReactChildrens>
          {listOfAccommodations?.map((accommodation, index) => {
            if (
              ignoreAccommodation &&
              ignoreAccommodation === accommodation.id
            ) {
              return false
            }

            return (
              <AccommodationCard
                key={accommodation.name}
                oddOrEven={index % 2 === 0 ? 'even' : 'odd'}
                data={accommodation}
              />
            )
          })}
        </SliderForReactChildrens>
      ) : (
        <div className={styles['accommodation-list']}>
          {listOfAccommodations?.map((accommodation, index) => {
            if (
              ignoreAccommodation &&
              ignoreAccommodation === accommodation.id
            ) {
              return false
            }

            return (
              <AccommodationCard
                key={accommodation.name}
                oddOrEven={index % 2 === 0 ? 'even' : 'odd'}
                data={accommodation}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
