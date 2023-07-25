'use client'

import React from 'react'

import { Parallax } from 'react-parallax'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import styles from './styles.module.scss'

interface SliderWithParallaxProps {
  images: string[]
  height?: number
}

export function SliderWithParallax({
  images,
  height = 800,
}: SliderWithParallaxProps) {
  const [opacities, setOpacities] = React.useState<number[]>([])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: images.length,
    loop: true,
    detailsChanged(s) {
      const newOpacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(newOpacities)
    },
  })

  return (
    <div className={styles['navigation-wrapper']}>
      <div ref={sliderRef} className={`${styles.fader}`} style={{ height }}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={styles.fader__slide}
            style={{ opacity: opacities[idx] }}
          >
            <Parallax bgImage={src} strength={500} blur={{ min: -5, max: 5 }}>
              <div className={styles['banner-info']} style={{ height }}>
                <div className={styles['text-container']}>
                  <h1>Simply Nature</h1>
                  <strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptates tenetur sapiente debitis error rem nobis
                    molestias delectus et quod dolor, deleniti tempora
                    necessitatibus aspernatur doloribus! Enim quos omnis
                    veritatis eaque!
                  </strong>
                </div>
              </div>
            </Parallax>
          </div>
        ))}
      </div>
    </div>
  )
}
