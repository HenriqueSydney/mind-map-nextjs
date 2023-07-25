import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './page.module.scss'
import { SectionContainer } from '@/components/SectionContainer'

export default function Loading() {
  return (
    <main className={styles.container}>
      <SectionContainer>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginLeft: '-2rem',
          }}
        >
          <Skeleton
            count={3}
            width={35}
            height={35}
            borderRadius="100%"
            inline={true}
            style={{
              marginLeft: '5rem',
            }}
          />
          <br />
          <br />
          <Skeleton
            count={3}
            width={75}
            inline={true}
            style={{
              marginLeft: '5rem',
            }}
          />
        </div>
        <div
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '1rem',
          }}
        >
          <Skeleton width="50%" height={35} />

          <Skeleton height={40} width="35%" style={{ marginTop: '2rem' }} />

          <Skeleton height={40} style={{ marginTop: '1rem' }} />

          <Skeleton height={40} style={{ marginTop: '1rem' }} />

          <Skeleton height={40} style={{ marginTop: '1rem' }} />

          <Skeleton height={40} style={{ marginTop: '1rem' }} />
          <div
            style={{
              width: '100%',
              padding: '2rem',
            }}
          >
            <Skeleton height={35} />
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div
          style={{
            width: '100%',
            padding: '0.5rem',
            textAlign: 'center',
          }}
        >
          <Skeleton width="50%" height={35} />

          <Skeleton height={150} style={{ marginTop: '2rem' }} />

          <Skeleton height={25} width="20%" style={{ marginTop: '2rem' }} />

          <Skeleton height={35} width="50%" style={{ marginTop: '2rem' }} />

          <Skeleton height={50} style={{ marginTop: '4rem' }} />
        </div>
      </SectionContainer>
    </main>
  )
}
