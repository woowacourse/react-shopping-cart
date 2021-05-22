import { Reducer } from 'react';
import { CartItem, CartItemOnServer } from '../../types';
import {
  ADD_ITEM,
  CartAction,
  GET_CART_ITEMS_SUCCESS,
  ADD_CART_ITEM_SUCCESS,
  CHANGE_ITEM_QUANTITY,
  DELETE_CART_ITEM_SUCCESS,
  CHANGE_ITEM_CHECKED,
  CHANGE_ALL_ITEM_CHECKED,
  DELETE_CHECKED_ITEMS_SUCCESS,
  CLEAR_CART_SUCCESS,
  LOADING,
  ERROR,
} from '../actions/cart';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
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
        // items: [...state.items, createCartItem(action.payload)],
      };

    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: [
          ...action.payload.map((item: CartItemOnServer) => ({
            ...item,
            quantity: 1,
            checked: true,
          })),
        ],
        isLoading: false,
      };

    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };

    case CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.cart_id === action.payload.cart_id ? action.payload : item
        ),
      };

    case CHANGE_ITEM_CHECKED:
      return {
        ...state,
        items: state.items.map((item) =>
          item.cart_id === action.payload ? { ...item, checked: !item.checked } : item
        ),
      };

    case CHANGE_ALL_ITEM_CHECKED:
      return {
        ...state,
        items: state.items.map((item) => ({ ...item, checked: action.payload })),
        isLoading: false,
      };

    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.cart_id !== action.payload),
        isLoading: false,
      };

    case DELETE_CHECKED_ITEMS_SUCCESS:
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
