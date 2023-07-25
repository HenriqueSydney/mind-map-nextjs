import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './page.module.scss'

export default function Loading() {
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <Skeleton count={1} width={300} height={35} />
        <Skeleton count={1} width={250} height={25} />
      </div>
      <div
        style={{
          width: '100%',
          padding: '2rem',
        }}
      >
        <Skeleton count={40} />
      </div>
    </main>
  )
}
