import { ItemInCart, Product } from '../../types';
import { createItemInCart } from '../../utils/cart';
import {
  ADD_ITEM,
  GET_CART_ITEMS,
  CartAction,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  ADD_CART_ITEM,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_ERROR,
  CHANGE_ITEM_QUANTITY,
  CHANGE_ITEM_QUANTITY_SUCCESS,
  CHANGE_ITEM_QUANTITY_ERROR,
} from '../actions/cart';

interface CartState {
  items: ItemInCart[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
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
        error: null,
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
    case ADD_CART_ITEM:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };
    case ADD_CART_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CHANGE_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
        isLoading: false,
      };
    case CHANGE_ITEM_QUANTITY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
