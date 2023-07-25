import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './[id]/page.module.scss'
import { SectionContainer } from '@/components/SectionContainer'

export default function Loading() {
  return (
    <>
      <div className={styles.slide}>
        <Skeleton count={1} height={500} width="100%" />
      </div>
      <Skeleton
        count={1}
        height={50}
        width={250}
        style={{ marginTop: '1.5rem', borderRadius: '25px' }}
      />
      <main className={styles.container}>
        <SectionContainer>
          <div
            style={{
              width: '100%',
              padding: '0.5rem',
            }}
          >
            <Skeleton count={1} height={35} width={250} />
            <br />
            <br />
            <Skeleton count={25} width="90%" />
          </div>
          <div
            style={{
              width: '100%',
              padding: '0.5rem',
            }}
          >
            <Skeleton count={1} width={250} height={30} />
            <br />
            <br />
            <Skeleton count={2} width="90%" />
          </div>
        </SectionContainer>
        <SectionContainer>
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
              width: '100%',
            }}
          >
            <Skeleton count={1} height={45} style={{ marginTop: '1.5rem' }} />
            <Skeleton count={1} height={55} style={{ marginTop: '1.5rem' }} />
          </div>
          <div
            style={{
              width: '100%',
              marginTop: '10rem',
            }}
          >
            <Skeleton count={1} height={45} />
          </div>
        </SectionContainer>
      </main>
    </>
  )
}
