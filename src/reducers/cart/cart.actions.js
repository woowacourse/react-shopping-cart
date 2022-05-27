export const actionTypes = {
  GET_CART_REQUEST: 'GET_CART_REQUEST',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
  SET_CART: 'SET_CART',
};

export const getCartRequest = () => ({
  type: actionTypes.GET_CART_REQUEST,
});

export const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

export const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});

export const setCart = (data) => ({
  type: actionTypes.SET_CART,
  data,
});
