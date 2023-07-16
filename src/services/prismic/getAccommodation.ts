import { createClient } from '@/services/prismic/prismicio'
import * as prismic from '@prismicio/client'

import {
  AccommodationData,
  FacilitiesData,
  facilities,
} from '@/dtos/accommodations'

import { getBooleanAttributes } from '@/utils/getBooleanAttributes'

export async function getAccommodation(
  accommodationId: string,
): Promise<AccommodationData | null> {
  const prismicClient = createClient()

  const response = await prismicClient.getByUID(
    'accommodations',
    accommodationId,
  )

  if (!response.data.acomodacao || !response.data.descricao) {
    return null
  }

  const facilitiesOfTheAccommodation = getBooleanAttributes(response.data)

  const facilitiesOfTheAccommodationWithData: FacilitiesData[] =
    facilities.filter((facility) =>
      facilitiesOfTheAccommodation.includes(facility.facility),
    )

  const accommodationInfo: AccommodationData = {
    id: accommodationId,
    name: prismic.asText(response.data.acomodacao)!,
    description: prismic.asHTML(response.data.descricao)!,
    price: response.data.valor_da_diaria,
    img: response.data.imagem_principal.url,
    imgAlt: response.data.imagem_principal.alt,
    facilities: facilitiesOfTheAccommodationWithData,
  } as AccommodationData

  return accommodationInfo
}
