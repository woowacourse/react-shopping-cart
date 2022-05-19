import { actionTypes } from 'reducers/cart/cart.actions';

const initialState = {
  data: [],
  isLoadingGetCart: false,
  isErrorGetCart: false,
  isLoadingAddCartItem: false,
  isSucceedAddCartItem: false,
  isErrorAddCartItem: false,

  isLoadingUpdateCartItemQuantity: false,
  isErrorUpdateCartItemQuantity: false,

  isLoadingDeleteCartItem: false,
  isErrorDeleteCartItem: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART_REQUEST) {
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

  if (action.type === actionTypes.ADD_CART_ITEM_REQUEST) {
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

  if (action.type === actionTypes.UPDATE_CART_ITEM_QUANTITY_REQUEST) {
    return {
      ...state,
      isLoadingUpdateCartItemQuantity: true,
      isErrorUpdateCartItemQuantity: false,
    };
  }

  if (action.type === actionTypes.UPDATE_CART_ITEM_QUANTITY_SUCCESS) {
    return {
      ...state,
      data: action.data,
      isLoadingUpdateCartItemQuantity: false,
    };
  }

  if (action.type === actionTypes.UPDATE_CART_ITEM_QUANTITY_ERROR) {
    return {
      ...state,
      isLoadingUpdateCartItemQuantity: false,
      isErrorUpdateCartItemQuantity: true,
    };
  }

  if (action.type === actionTypes.DELETE_CART_ITEM_REQUEST) {
    return {
      ...state,
      isLoadingDeleteCartItem: true,
      isErrorDeleteCartItem: false,
    };
  }

  if (action.type === actionTypes.DELETE_CART_ITEM_SUCCESS) {
    return {
      ...state,
      data: action.data,
      isLoadingDeleteCartItem: false,
    };
  }
  if (action.type === actionTypes.DELETE_CART_ITEM_ERROR) {
    return {
      ...state,
      isLoadingDeleteCartItem: false,
      isErrorDeleteCartItem: true,
    };
  }

  return state;
};

export default cartReducer;
