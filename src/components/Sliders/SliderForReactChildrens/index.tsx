'use client'

import React, { ReactNode, useState } from 'react'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import { ClipLoader } from 'react-spinners'

interface SliderProps {
  children: ReactNode
}

export function SliderForReactChildrens({ children }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [display, setDisplay] = useState<string[]>([])

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: React.Children.count(children),
    loop: true,
    detailsChanged(s) {
      const newDisplays = s.track.details.slides.map((slide) => {
        if (slide.portion === 0) {
          return 'none'
        } else {
          return 'block'
        }
      })

      const displaysBlocks = newDisplays.filter(
        (item) => item === 'block',
      ).length
      if (displaysBlocks === 1) {
        setDisplay(newDisplays)
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className={styles['navigation-wrapper']}>
      <div ref={sliderRef} className={`${styles.fader}`}>
        {React.Children.map(children, (child, index) => {
          // Retorna um novo elemento filho baseado no map
          return (
            <div
              key={index}
              className={`${styles.fader__slide} ${
                isLoading ? styles['loading-container'] : ''
              }`}
              style={{ display: display[index] }}
            >
              {isLoading && (
                <div className={styles.loading}>
                  <ClipLoader color="#00875F" size={50} />
                </div>
              )}
              {child}
            </div>
          )
        })}
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
    </div>
  )
}
