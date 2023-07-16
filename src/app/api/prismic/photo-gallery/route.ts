import { createClient } from '@/services/prismic/prismicio'
import { NextRequest, NextResponse } from 'next/server'

type PhotoGallery = {
  alt: string
  url: string
}

export async function GET(request: NextRequest) {
  const prismicClient = createClient()

  const response = await prismicClient.getByUID<any>(
    'photo_gallery',
    'photo_gallery',
  )

  if (!response) {
    return null
  }

  const gallery: PhotoGallery[] = response.data.images.map((image: any) => {
    return {
      alt: image.image.alt,
      url: image.image.url,
    }
  })

  return NextResponse.json(gallery, { status: 201 })
}
