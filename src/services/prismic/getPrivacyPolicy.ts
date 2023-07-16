import * as prismic from '@prismicio/client'
import { createClient } from '@/services/prismic/prismicio'
import { datePtBrFormatter } from '@/utils/date'

interface GetPrivacyPolicyResponse {
  title: string
  content: string
  updatedAt: string
}

export async function getPrivacyPolicy(): Promise<GetPrivacyPolicyResponse | null> {
  const prismicClient = createClient()

  const response = await prismicClient.getByUID(
    'privacy_policy',
    'privacy_policy',
  )

  if (!response.data.titulo_da_politica) {
    return null
  }

  const updatedDateString = datePtBrFormatter(
    new Date(response.last_publication_date),
  )

  const privacyPolice = {
    title: prismic.asText(response.data.titulo_da_politica),
    content: prismic.asHTML(response.data.politica_de_privacidade),
    updatedAt: updatedDateString,
  } as GetPrivacyPolicyResponse

  return privacyPolice
}
