import {
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILURE,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
  AddCartItemAction,
  GetCartItemsAction,
} from './actions';
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

export const cartReducer = (state: CartState = initialState, action: AddCartItemAction | GetCartItemsAction) => {
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
    case GET_CART_ITEMS_REQUEST:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          success: false,
          error: null,
        },
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: {
          data: action.cartItems,
          success: true,
          error: null,
        },
      };
    case GET_CART_ITEMS_FAILURE:
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
