import { getAccommodation } from '@/services/prismic/getAccommodation'

import { Slider } from '@/components/Sliders/Slider'
import { FacilitiesInfo } from '@/components/FacilitiesInfo'
import { InitialCheckoutForm } from '@/components/Form/InitialCheckoutForm'
import { SectionContainer } from '@/components/SectionContainer'
import { Activities } from '@/components/Cards/Activities'
import { AccommodationFormCheckout } from './components/AccommodationFormCheckout.'

import { Accommodations as SuggestionsOfAccommodations } from '@/components/Cards/Accommodations'

import styles from './page.module.scss'
import cmsStyles from '@/styles/cms.module.scss'

const images = [
  '/banner.jpg',
  '/banner2.jpeg',
  '/camping.jpg',
  '/chale.jpeg',
  '/chale1.jpeg',
  '/rapel.jpeg',
  '/suite.jpeg',
]

interface AccommodationsProps {
  params: {
    id: string
  }
}

export default async function Accommodations({
  params: { id },
}: AccommodationsProps) {
  const accommodationInfo = await getAccommodation(id)

  return (
    <>
      <div className={styles.slide}>
        <Slider images={images} />
      </div>
      <main className={styles.container}>
        <SectionContainer>
          <div className={styles.description}>
            <h1>{accommodationInfo?.name}</h1>

            {accommodationInfo?.description && (
              <div
                className={cmsStyles.postContent}
                dangerouslySetInnerHTML={{
                  __html: accommodationInfo?.description,
                }}
              />
            )}
          </div>
          <div>
            <strong>Esta acomodação possui:</strong>
            <div className={styles['facilities-list']}>
              {accommodationInfo?.facilities.map(({ title, icon }) => (
                <FacilitiesInfo key={title} title={title} icon={icon} />
              ))}
            </div>
          </div>
        </SectionContainer>
        <SectionContainer>
          <InitialCheckoutForm headerTitle="Vamos reservar um dia?">
            <AccommodationFormCheckout accommodation={accommodationInfo} />
          </InitialCheckoutForm>
        </SectionContainer>
      </main>
      <section className={styles['suggestions-section']}>
        <SuggestionsOfAccommodations
          title="Que tal conhecer outras de nossas acomodações?"
          ignoreAccommodation={id}
          slide={true}
        />

        <Activities
          title="Conheça também nossas atividades"
          isSuggestion={true}
        />
      </section>
    </>
  )
}
