import { actionTypes } from 'reducers/cart/cart.actions';

export const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART_REQUEST) {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }

  if (action.type === actionTypes.GET_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  if (action.type === actionTypes.SET_CART) {
    return {
      ...state,
      data: action.data,
    };
  }

  return state;
};

export default cartReducer;
