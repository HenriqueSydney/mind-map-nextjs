import { ProductCard } from '../ProductCard'

import { fetchActivities } from '@/services/prismic/fetchActivities'

import styles from './styles.module.scss'

interface ActivitiesProps {
  title: string
  ignoreActivity?: string | null
  isSuggestion?: boolean
}

export async function Activities({
  title,
  ignoreActivity = null,
  isSuggestion = false,
}: ActivitiesProps) {
  const activities = await fetchActivities()
  return (
    <section className={styles['section-container']}>
      <h1>{title}</h1>
      <div
        className={`${styles['product-list']} ${
          isSuggestion && styles['product-suggestion']
        }`}
      >
        {activities?.map((activity) => {
          if (ignoreActivity && ignoreActivity === activity.id) {
            return false
          }
          return <ProductCard key={activity.id} data={activity} />
        })}
      </div>
    </section>
  )
}
