import * as prismic from '@prismicio/client'

import { createClient } from '@/services/prismic/prismicio'
import { ProductData } from '@/dtos/activities'

export async function fetchActivities(): Promise<ProductData[] | null> {
  const prismicClient = createClient()

  const response = await prismicClient.getByType<any>('activities', {
    pageSize: 10,
  })

  if (response.results.length === 0) {
    return null
  }

  const activities: ProductData[] = response.results.map((activity) => {
    let price = 0

    if (activity.data.valor_da_atividade) {
      price = activity.data.valor_da_atividade
    } else if (activity.data.valor_adulto > 0) {
      price = activity.data.valor_adulto
    }

    return {
      id: activity.uid,
      name: prismic.asText(activity.data.nome_da_atividade)!,
      excerpt: prismic.asText(activity.data.resumo)!,
      img: activity.data.imagem_principal.url,
      imgAlt: activity.data.imagem_principal.alt,
      price,
    }
  })

  return activities
}
