import { SliderWithParallax } from '@/components/Sliders/SliderWithParallax'
import { Slider } from '@/components/Sliders/Slider'
import { Accommodations } from '@/components/Cards/Accommodations'
import { Activities } from '@/components/Cards/Activities'

import styles from './page.module.scss'

const images = [
  '/banner.jpg',
  '/banner2.jpeg',
  '/camping.jpg',
  '/chale.jpeg',
  '/chale1.jpeg',
  '/rapel.jpeg',
  '/suite.jpeg',
]

export default async function Home() {
  return (
    <>
      <div className={styles.banner}>
        <SliderWithParallax images={images} height={850} />
      </div>
      <main className={styles.container}>
        <Accommodations title="Nossas Acomodações" />

        <Activities title="Nossas Atividades" />

        <section className={styles['section-container']}>
          <h1>Galeria de Fotos</h1>
          <div className={styles['slider-container']}>
            <Slider images={images} link="/photo-gallery" />
          </div>
        </section>
      </main>
    </>
  )
}
