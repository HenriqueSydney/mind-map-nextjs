import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

interface ILightboxProps {
  images: {
    src: string
    name: string
  }[]
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  initialImage?: string
}

export function CustomLightbox({
  images,
  isOpen,
  setIsOpen,
  initialImage = '',
}: ILightboxProps) {
  const initialImageIndex = images.findIndex(
    (image) => image.name === initialImage,
  )

  return (
    <Lightbox
      open={isOpen}
      close={() => setIsOpen(false)}
      index={initialImageIndex}
      slides={images}
      plugins={[Zoom, Counter, Slideshow, Thumbnails]}
      slideshow={{ autoplay: false, delay: 5000 }}
      carousel={{ preload: 2 }}
      animation={{ zoom: 500 }}
      zoom={{
        maxZoomPixelRatio: 1,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
        scrollToZoom: false,
      }}
      thumbnails={{
        position: 'bottom',
        width: 120,
        height: 80,
        border: 1,
        borderRadius: 4,
        padding: 4,
        gap: 16,
        showToggle: false,
      }}
    />
  )
}
