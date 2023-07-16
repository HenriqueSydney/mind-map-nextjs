import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBed,
  faChampagneGlasses,
  faTv,
  faUtensils,
  faWifi,
  faWind,
} from '@fortawesome/free-solid-svg-icons'

export type FacilitiesData = {
  title: string
  icon: IconDefinition
  facility: string
}

export type AccommodationData = {
  id: string
  name: string
  description: string
  facilities: FacilitiesData[]
  price: number
  img: string
  imgAlt: string
}

export const facilities: FacilitiesData[] = [
  { icon: faBed, title: 'Cama de casal', facility: 'cama_de_casal' },
  { icon: faWind, title: 'Ar condicionado', facility: 'cama_de_casal' },
  { icon: faChampagneGlasses, title: 'Frigobar', facility: 'frigobar' },
  {
    icon: faTv,
    title: 'TV de 48 Polegadas com mais de 60 canais',
    facility: 'tv_48',
  },
  {
    icon: faUtensils,
    title: 'Churrasqueira particular',
    facility: 'churrasqueira',
  },
  { icon: faWifi, title: 'Wifi grátis', facility: 'wifi' },
]
