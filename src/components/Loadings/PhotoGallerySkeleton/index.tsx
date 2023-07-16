import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import styles from './styles.module.scss'

export function PhotoGallerySkeleton() {
  return (
    <>
      <div className={styles.container}>
        <Skeleton count={1} width={250} height={250} />
        <Skeleton count={1} width={225} height={250} />
        <Skeleton count={1} width={200} height={250} />
        <Skeleton count={1} width={300} height={250} />
        <Skeleton count={1} width={200} height={250} />
        <Skeleton count={1} width={250} height={250} />
        <Skeleton count={1} width={225} height={250} />
        <Skeleton count={1} width={200} height={250} />
        <Skeleton count={1} width={300} height={250} />
        <Skeleton count={1} width={200} height={250} />
        <Skeleton count={1} width={250} height={250} />
        <Skeleton count={1} width={225} height={250} />
        <Skeleton count={1} width={200} height={250} />
        <Skeleton count={1} width={300} height={250} />
        <Skeleton count={1} width={200} height={250} />
      </div>
    </>
  )
}
