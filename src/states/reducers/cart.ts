import { ItemInCart } from '../../types';
import { createItemInCart } from '../../utils/cart';
import {
  ADD_ITEM,
  CartAction,
  GET_CART_ITEMS_SUCCESS,
  ADD_CART_ITEM_SUCCESS,
  CHANGE_ITEM_QUANTITY_SUCCESS,
  DELETE_CART_ITEM_SUCCESS,
  CHANGE_CART_ITEM_CHECKED_SUCCESS,
  CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS,
  DELETE_CHECKED_CART_ITEM_SUCCESS,
  CLEAR_CART_SUCCESS,
  LOADING,
  ERROR,
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
    case LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, createItemInCart(action.payload)],
      };

    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        isLoading: false,
      };

    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };

    case CHANGE_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
        isLoading: false,
      };

    case CHANGE_CART_ITEM_CHECKED_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
        isLoading: false,
      };

    case CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => ({ ...item, checked: action.payload })),
        isLoading: false,
      };

    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        isLoading: false,
      };

    case DELETE_CHECKED_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => !item.checked),
        isLoading: false,
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        items: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
