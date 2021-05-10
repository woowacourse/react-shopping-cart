import { ADD_CART_ITEM_REQUEST, ADD_CART_ITEM_SUCCESS, ADD_CART_ITEM_FAILURE, AddCartItemAction } from './actions';
import * as T from '../../types';

export type CartState = {
  cartItems: {
    data: T.CartItem[];
    success: boolean;
    error: Error | null;
  };
};

const initialState: CartState = {
  cartItems: {
    data: [],
    success: false,
    error: null,
  },
};

export const cartReducer = (state: CartState = initialState, action: AddCartItemAction) => {
  switch (action.type) {
    case ADD_CART_ITEM_REQUEST:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          success: false,
          error: null,
        },
      };
    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          success: true,
          error: null,
        },
      };
    case ADD_CART_ITEM_FAILURE:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          success: false,
          error: action.error,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
