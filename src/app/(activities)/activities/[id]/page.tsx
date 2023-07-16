import { getActivities } from '@/services/prismic/getActivities'

import { Divider } from '@/components/Divider'
import { InitialCheckoutForm } from '@/components/Form/InitialCheckoutForm'
import { SectionContainer } from '@/components/SectionContainer'
import { ActivityFormCheckout } from './components/ActivityFormCheckout'
import { ActivityContact } from './components/ActivityContact'
import { SliderWithLightbox } from '@/components/Sliders/SliderWithLightbox'

import { Accommodations as SuggestionsOfAccommodations } from '@/components/Cards/Accommodations'
import { Activities as SuggestionsOfActivities } from '@/components/Cards/Activities'

import styles from './page.module.scss'
import cmsStyles from '@/styles/cms.module.scss'

interface IActivitiesProps {
  params: {
    id: string
  }
}

export default async function Activities({ params: { id } }: IActivitiesProps) {
  const activityInfo = await getActivities(id)

  return (
    <>
      <div className={styles.slide}>
        <SliderWithLightbox images={activityInfo!.images} />
      </div>
      <div className={styles.divider}>
        <Divider />
      </div>
      <div className={styles.title}>
        <h1>Atividade</h1>
      </div>
      <main className={styles.container}>
        <SectionContainer>
          <div className={styles.description}>
            <h1>{activityInfo?.name}</h1>
            {activityInfo?.description && (
              <div
                className={cmsStyles.postContent}
                dangerouslySetInnerHTML={{
                  __html: activityInfo?.description,
                }}
              />
            )}
          </div>
        </SectionContainer>
        <SectionContainer>
          {!activityInfo?.externalContact ? (
            <InitialCheckoutForm headerTitle="Vamos reservar um dia?">
              <ActivityFormCheckout activity={activityInfo!} />
            </InitialCheckoutForm>
          ) : (
            <InitialCheckoutForm headerTitle="Contato para reserva">
              <ActivityContact activity={activityInfo!} />
            </InitialCheckoutForm>
          )}
        </SectionContainer>
      </main>
      <section className={styles['suggestions-section']}>
        <SuggestionsOfActivities
          title="Que tal conhecer outras de nossas atividades?"
          ignoreActivity={id}
          isSuggestion={true}
        />
        <SuggestionsOfAccommodations
          title="Conheça também nossas acomodações"
          slide={true}
        />
      </section>
    </>
  )
}
