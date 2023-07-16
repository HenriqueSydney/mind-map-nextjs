import React, { MutableRefObject } from 'react'

import './styles.css'

import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import styles from './styles.module.scss'

interface SliderWithThumbnailProps {
  images: string[]
}

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export function SliderWithThumbnail({ images }: SliderWithThumbnailProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  )

  return (
    <>
      <div
        ref={sliderRef}
        className={`${styles['keen-slider__slide-container']} keen-slider__slide number-slide1`}
      >
        {images.map((src, idx) => (
          <div key={src}>
            <img
              src={src}
              alt=""
              className={`keen-slider__slide number-slide`}
            />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {images.map((src, idx) => (
          <div
            key={src}
            className={`${styles['keen-slider__slide']} keen-slider__slide number-slide`}
          >
            <img src={src} alt="" style={{ borderRadius: '7px' }} />
          </div>
        ))}
      </div>
    </>
  )
}
