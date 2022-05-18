import actionTypes from 'reducers/cart/cart.actionTypes';

const initialState = {
  data: [],
  isLoadingGetCart: false,
  isErrorGetCart: false,
  isLoadingAddCartItem: false,
  isSucceedAddCartItem: false,
  isErrorAddCartItem: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART) {
    return { ...state, isLoadingGetCart: true };
  }

  if (action.type === actionTypes.GET_CART_SUCCESS) {
    return {
      ...state,
      isLoadingGetCart: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_ERROR) {
    return {
      ...state,
      isLoadingGetCart: false,
      isErrorGetCart: true,
    };
  }

  if (action.type === actionTypes.ADD_CART_ITEM) {
    return {
      ...state,
      isLoadingAddCartItem: true,
      isSucceedAddCartItem: false,
      isErrorAddCartItem: false,
    };
  }

  if (action.type === actionTypes.ADD_CART_ITEM_SUCCESS) {
    return {
      ...state,
      isLoadingAddCartItem: false,
      isSucceedAddCartItem: true,
      isErrorAddCartItem: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.ADD_CART_ITEM_ERROR) {
    return {
      ...state,
      isLoadingAddCartItem: false,
      isSucceedAddCartItem: false,
      isErrorAddCartItem: true,
    };
  }
  return state;
};

export default cartReducer;
