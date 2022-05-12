import actionTypes from 'reducers/product/product.actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART) {
    return { ...state, isLoading: true };
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

  return state;
};

export default cartReducer;
