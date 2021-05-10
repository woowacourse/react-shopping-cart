import { ItemInCart, Product } from '../../types';
import {
  ADD_ITEM,
  GET_CART_ITEMS,
  CartAction,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
} from '../actions/cart';

interface CartState {
  items: ItemInCart[];
}

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const createItemInCart = (product: Product): ItemInCart => {
  return {
    ...product,
    checked: true,
    quantity: 1,
  };
};

const cartReducer = (state: CartState = initialState, action: CartAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, createItemInCart(action.payload)],
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        isLoading: false,
      };
    case GET_CART_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
