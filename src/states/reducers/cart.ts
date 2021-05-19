import { AxiosError } from 'axios';
import { REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, CartAction, CHANGE_QUANTITY } from '../actionTypes/cart';

export interface cartState {
  loading: boolean;
  error: AxiosError | null;
  cart: CartItem[];
}

const initialState: cartState = {
  loading: false,
  error: null,
  cart: [],
};

export const cartReducer = (state: cartState = initialState, action: CartAction): cartState => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
