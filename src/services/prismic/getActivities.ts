import { createClient } from '@/services/prismic/prismicio'
import * as prismic from '@prismicio/client'

import {
  AvailableHourRanges,
  ProductData,
  ProductImages,
} from '@/dtos/activities'

type PrimicActivity = {
  imagem_principal: prismic.ImageField
  nome_da_atividade: prismic.RichTextField
  resumo: prismic.RichTextField
  descricao_da_atividade: prismic.RichTextField
  valor_unico: boolean
  valor_da_atividade: number | null
  valor_adulto: number
  valor_crianca: number
  valor_idoso: number
  contato_externo: string | null
  horarios_disponiveis: {
    horario: string
    quantidade: string
  }[]
  images: {
    url: string
    alt: string
  }[]
}

export async function getActivities(
  activityId: string,
): Promise<ProductData | null> {
  const prismicClient = createClient()

  const { data } = await prismicClient.getByUID('activities', activityId)

  if (!data) {
    return null
  }

  const {
    nome_da_atividade,
    descricao_da_atividade,
    horarios_disponiveis,
    imagem_principal,
    resumo,
    valor_adulto,
    valor_crianca,
    valor_idoso,
    valor_unico,
    valor_da_atividade,
    contato_externo,
    images,
  } = data as PrimicActivity

  const availableHourRanges: AvailableHourRanges[] = horarios_disponiveis.map(
    (availableHour) => {
      return {
        hourRange: availableHour.horario,
        quantity: Number(availableHour.quantidade),
      }
    },
  )

  const productImages: ProductImages[] = images.map((image: any) => {
    return {
      src: image.image.url,
      name: image.image.alt,
    }
  })

  const activityInfo = {
    id: activityId,
    name: prismic.asText(nome_da_atividade),
    excerpt: prismic.asText(resumo),
    description: prismic.asHTML(descricao_da_atividade),
    price: 10,
    img: imagem_principal.url,
    imgAlt: imagem_principal.alt,
    availableHourRanges,
    isUniquePrice: !!valor_unico,
    uniquePrice: valor_da_atividade,
    adultPrice: valor_adulto,
    childPrice: valor_crianca,
    seniorPrice: valor_idoso,
    externalContact: contato_externo,
    images: productImages,
  } as ProductData

  return activityInfo
}
