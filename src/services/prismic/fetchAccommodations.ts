import * as prismic from '@prismicio/client'
import { getBooleanAttributes } from '@/utils/getBooleanAttributes'
import { facilities } from '@/dtos/accommodations'

import { AccommodationData } from '../../dtos/accommodations'
import { createClient } from '@/services/prismic/prismicio'

export async function fetchAccommodations(): Promise<
  AccommodationData[] | null
> {
  const prismicClient = createClient()

  const response = await prismicClient.getByType<any>('accommodations', {
    pageSize: 10,
  })

  if (!response) {
    return null
  }

  const accommodations: AccommodationData[] = response.results.map(
    (accommodation) => {
      const facilitiesOfTheAccommodation = getBooleanAttributes(
        accommodation.data,
      )

      const facilitiesOfTheAccommodationWithData = facilities.filter(
        (facility) => facilitiesOfTheAccommodation.includes(facility.facility),
      )

      return {
        id: accommodation.uid,
        name: prismic.asText(accommodation.data.acomodacao)!,
        description: prismic.asHTML(accommodation.data.descricao)!,
        img: accommodation.data.imagem_principal.url,
        imgAlt: accommodation.data.imagem_principal.alt,
        price: accommodation.data.valor_da_diaria,
        facilities: facilitiesOfTheAccommodationWithData,
      }
    },
  )

  return accommodations
}
