'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Gallery } from 'next-gallery'

import { CustomLightbox } from '@/components/Sliders/CustomLightbox'
import { PhotoGallerySkeleton } from '@/components/Loadings/PhotoGallerySkeleton'
import { Overlay } from './Overlay'

import styles from './page.module.scss'
import './styles.scss'

interface PhotoGalleryImages {
  src: string
  aspect_ratio: number
  name: string
}

type PhotoGalleryType = {
  alt: string
  url: string
}

const WIDTHS = [500, 1000, 1600]
const RATIOS = [2.2, 4, 6, 8]
const ASPECT_RATIOS = [16 / 9, 16 / 9, 32 / 9, 16 / 9, 32 / 9]

export default function PhotoGallery() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [initialImageLightbox, setInitialImageLightbox] = useState('')
  const { data: images } = useQuery<PhotoGalleryImages[]>(
    ['photo-for-gallery'],
    async () => {
      const response = await fetch(`/api/prismic/photo-gallery`)

      const gallery: PhotoGalleryType[] = await response.json()
      let ratioIndex = 0
      const images: PhotoGalleryImages[] = gallery.map((image) => {
        if (ratioIndex >= ASPECT_RATIOS.length) ratioIndex = 0
        const aspectRatio = ASPECT_RATIOS[ratioIndex]
        ratioIndex++
        return {
          src: image.url,
          aspect_ratio: aspectRatio,
          name: image.alt,
        }
      })

      return images
    },
  )

  function handleImageClick(name: string) {
    setInitialImageLightbox(name)
    setIsLightboxOpen(true)
  }

  return (
    <div className={styles.container}>
      <main>
        <h1>Galeria de fotos</h1>
        {!images && <PhotoGallerySkeleton />}
        {images && (
          <>
            <Gallery
              initState={false}
              overlay={(name) => (
                <Overlay onClick={() => handleImageClick(name)} />
              )}
              images={images}
              widths={WIDTHS}
              ratios={RATIOS}
            />

            <CustomLightbox
              images={images}
              isOpen={isLightboxOpen}
              setIsOpen={setIsLightboxOpen}
              initialImage={initialImageLightbox}
            />
          </>
        )}
      </main>
    </div>
  )
}
