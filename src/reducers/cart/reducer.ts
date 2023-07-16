import { produce } from 'immer'

import { ActionTypes } from './actions'
import { CartData } from '@/context/CartContext'

interface CartState {
  cart: CartData[]
}

interface IAction {
  type: ActionTypes
  payload?: {
    cartData: CartData
  }
}

export function cartReducer(state: CartState, action: IAction) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM: {
      const currentItemIndex = state.cart.findIndex(
        (cart) =>
          cart.type === action.payload!.cartData.type &&
          cart.id === action.payload!.cartData.id,
      )

      if (currentItemIndex < 0) {
        return produce(state, (draft: CartState) => {
          draft.cart.push(action.payload!.cartData)
        })
      }

      return produce(state, (draft: CartState) => {
        draft.cart[currentItemIndex] = action.payload!.cartData
      })
    }
    case ActionTypes.REMOVE_ITEM_FROM_CART: {
      const currentItemIndex = state.cart.findIndex(
        (cart) =>
          cart.type === action.payload!.cartData.type &&
          cart.id === action.payload!.cartData.id,
      )

      if (currentItemIndex < 0) {
        return state
      }

      return produce(state, (draft: CartState) => {
        draft.cart = state.cart.filter((_, index) => index !== currentItemIndex)
      })
    }

    case ActionTypes.CLEAN_CART_AFTER_CHECKOUT: {
      return produce(state, (draft: CartState) => {
        draft.cart = []
      })
    }

    case ActionTypes.UPDATE_ACTIVITY_QUANTITY: {
      const currentItemIndex = state.cart.findIndex(
        (cart) =>
          cart.type === action.payload!.cartData.type &&
          cart.id === action.payload!.cartData.id,
      )

      if (currentItemIndex < 0) {
        return state
      }

      return produce(state, (draft: CartState) => {
        draft.cart[currentItemIndex] = action.payload!.cartData
      })
    }

    default:
      return state
  }
}
