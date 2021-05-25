import { AxiosError } from 'axios';
import {
  LOADING,
  LOADING_SUCCESS,
  LOADING_FAILURE,
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  CartAction,
  CHANGE_QUANTITY,
  SELECT_CART_ITEM,
  DELETE_ORDERED_ITEMS,
} from '../actionTypes/cart';

export interface cartState {
  loading: boolean;
  loadingError: AxiosError | null;
  error: Error | null;
  cart: CartItem[];
}

const initialState: cartState = {
  loading: false,
  loadingError: null,
  error: null,
  cart: [],
};

export const cartReducer = (state: cartState = initialState, action: CartAction): cartState => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        loadingError: null,
      };
    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        loadingError: action.loadingError,
      };
    case REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        error: null,
        cart: action.payload,
      };
    case CHANGE_QUANTITY:
    case SELECT_CART_ITEM:
    case DELETE_ORDERED_ITEMS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
