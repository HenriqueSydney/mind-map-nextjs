export type AvailableHourRanges = {
  hourRange: string
  quantity: number
}

export type ProductImages = {
  src: string
  name: string
}

export type ProductData = {
  id: string
  name: string
  excerpt: string
  description?: string
  isUniquePrice?: boolean
  uniquePrice?: number
  adultPrice?: number
  childPrice?: number
  seniorPrice?: number
  externalContact?: string
  availableHourRanges?: AvailableHourRanges[]
  img: string
  imgAlt: string
  price: number
  images: ProductImages[]
}
