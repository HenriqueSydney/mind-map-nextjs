'use client'

import {
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react'

import { cartReducer } from '../reducers/cart/reducer'
import {
  addNewItemToCartAction,
  cleanCartAfterCheckoutAction,
  removeItemFromCartAction,
} from '../reducers/cart/actions'

type ICheckoutData = {
  paymentMethod: string
}

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

interface CartContextType {
  cart: CartData[]
  checkoutData: ICheckoutData
  setCheckoutDataState: (checkoutFormData: ICheckoutData) => void
  addNewItemToCart: (cartData: CartData) => void
  removeItemFromCart: (cartData: CartData) => void
  cleanCart: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [checkoutData, setCheckoutData] = useState({} as ICheckoutData)
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cart: [],
      cartItemsName: [],
    },
    (initialState) => {
      if (typeof window !== 'undefined') {
        const storedStateAsJSON = localStorage.getItem(
          '@chapada-indaia:cart-state-1.0.0',
        )

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      }
      return initialState
    },
  )

  const { cart } = cartState

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@chapada-indaia:cart-state-1.0.0', stateJSON)
  }, [cartState])

  function setCheckoutDataState(checkoutFormData: ICheckoutData) {
    setCheckoutData(checkoutFormData)
  }

  function addNewItemToCart(cartData: CartData) {
    dispatch(addNewItemToCartAction(cartData))
  }

  function removeItemFromCart(cartData: CartData) {
    dispatch(removeItemFromCartAction(cartData))
  }

  function cleanCart() {
    dispatch(cleanCartAfterCheckoutAction())
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        checkoutData,
        setCheckoutDataState,
        addNewItemToCart,
        removeItemFromCart,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
