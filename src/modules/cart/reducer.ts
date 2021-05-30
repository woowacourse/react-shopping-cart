import { GET_CART_ITEMS_SUCCESS, GET_CART_ITEMS_FAILURE, GET_CART_ITEMS_REQUEST, SET_CART_ITEMS } from './actions';
import { CartAction, CartState } from './type';

const initialState: CartState = {
  loading: false,
  cartItems: [],
  error: null,
};

export const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case GET_CART_ITEMS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case GET_CART_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
