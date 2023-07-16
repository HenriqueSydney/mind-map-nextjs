import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './page.module.scss'

export default function Loading() {
  return (
    <>
      <main className={styles['page-container']}>
        <section className={styles['section-container']}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Skeleton count={1} width={200} height={25} />
            <Skeleton count={1} width={400} height={1} />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <Skeleton
              count={1}
              width={500}
              height={35}
              style={{ marginTop: '1.5rem' }}
            />
            <Skeleton
              count={1}
              width={500}
              height={35}
              style={{ marginTop: '1.5rem' }}
            />
            <Skeleton
              count={1}
              width={500}
              height={35}
              style={{ marginTop: '1.5rem' }}
            />
            <Skeleton
              count={1}
              width={500}
              height={35}
              style={{ marginTop: '1.5rem' }}
            />
            <Skeleton
              count={1}
              width={400}
              height={25}
              style={{ marginTop: '1.5rem' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: '1.5rem',
            }}
          >
            <Skeleton count={1} width={300} height={45} />
          </div>
        </section>
      </main>
    </>
  )
}
