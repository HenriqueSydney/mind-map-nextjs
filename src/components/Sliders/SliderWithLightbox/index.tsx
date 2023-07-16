'use client'

import React, { useState } from 'react'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import { CustomLightbox } from '../CustomLightbox'

interface SliderProps {
  images: {
    src: string
    name: string
  }[]
}

export function SliderWithLightbox({ images }: SliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [opacities, setOpacities] = React.useState<number[]>([])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [initialImageLightbox, setInitialImageLightbox] = useState('')

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: images.length,
    loop: true,
    detailsChanged(s) {
      const newOpacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(newOpacities)
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function handleImageClick(name: string) {
    console.log(images)
    setInitialImageLightbox(name)
    setIsLightboxOpen(true)
  }

  return (
    <div className={styles['navigation-wrapper']}>
      <div ref={sliderRef} className={`${styles.fader}`}>
        {images.map(({ src, name }, idx) => (
          <div
            key={idx}
            className={styles.fader__slide}
            style={{ opacity: opacities[idx] }}
          >
            <img
              src={src}
              alt=""
              style={{ borderRadius: '6px' }}
              onClick={() => handleImageClick(name)}
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <FontAwesomeIcon
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            icon={faChevronLeft}
            className={`${styles.arrow} ${styles['arrow--left']}`}
          />

          <FontAwesomeIcon
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            icon={faChevronRight}
            className={`${styles.arrow} ${styles['arrow--right']}`}
          />
        </>
      )}

      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={
                  currentSlide === idx
                    ? `${styles.dot} ${styles.active}`
                    : styles.dot
                }
              ></button>
            )
          })}
        </div>
      )}
      <CustomLightbox
        images={images}
        isOpen={isLightboxOpen}
        setIsOpen={setIsLightboxOpen}
        initialImage={initialImageLightbox}
      />
    </div>
  )
}
