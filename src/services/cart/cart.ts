import { setCookie, getCookie } from 'cookies-next'

const CART_COOKIE_NAME = '@chapada-indaia:cart_data'
const CART_MAX_AGE = 3600 * 24 * 7 // 1 week (in seconds)

export type AccommodationCartData = {
  accommodationId: string
  title: string
  quantityOfDays: number
  quantityOfAccommodations: number
  checkInDate: Date
  checkOutDate: Date
}

export type ActivityCartData = {
  title: string
  activityId: string
  quantityOfAdults: number
  quantityOfChildren: number
  quantityOfSeniors: number
  date: Date
  hourInterval: string
}

export type CartData = {
  type: 'accommodation' | 'activity'
  id: string
  accommodation?: AccommodationCartData
  activity?: ActivityCartData
  subtotal: number
  isIncludedInCart: boolean
}

interface CartReturnType {
  addNewItemToCart: (cartData: CartData) => void
  getCartData: () => CartData | null
  cleanCart: () => void
}

export function cartService(): CartReturnType {
  function addNewItemToCart(data: CartData) {
    const serializedData = JSON.stringify(data)
    const cookieOptions = {
      maxAge: CART_MAX_AGE,
      expires: new Date(Date.now() + CART_MAX_AGE * 1000),
      // httpOnly: true,
      path: '/',
    }

    setCookie(CART_COOKIE_NAME, serializedData, cookieOptions)
  }

  function getCartData() {
    const cookies = getCookie(CART_COOKIE_NAME)
    console.log(cookies)
    // const cartData = cookies[CART_COOKIE_NAME] || null
    // cartData ? JSON.parse(cartData) : null
    return null
  }

  function cleanCart() {
    const cookieOptions = {
      maxAge: -1,
      path: '/',
    }
    setCookie(CART_COOKIE_NAME, '', cookieOptions)
  }

  return {
    addNewItemToCart,
    getCartData,
    cleanCart,
  }
}
