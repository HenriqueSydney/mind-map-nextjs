/* eslint-disable no-unused-vars */
import { CartData } from '@/context/CartContext'

export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  CLEAN_CART_AFTER_CHECKOUT = 'CLEAN_CART_AFTER_CHECKOUT',
  UPDATE_ACTIVITY_QUANTITY = 'UPDATE_ACTIVITY_QUANTITY',
}

export function addNewItemToCartAction(cartData: CartData) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: {
      cartData,
    },
  }
}

export function removeItemFromCartAction(cartData: CartData) {
  return {
    type: ActionTypes.REMOVE_ITEM_FROM_CART,
    payload: {
      cartData,
    },
  }
}

export function cleanCartAfterCheckoutAction() {
  return {
    type: ActionTypes.CLEAN_CART_AFTER_CHECKOUT,
  }
}

export function updateActivityQuantityAction(cartData: CartData) {
  return {
    type: ActionTypes.UPDATE_ACTIVITY_QUANTITY,
    payload: {
      cartData,
    },
  }
}
