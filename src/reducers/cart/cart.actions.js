export const actionTypes = {
  ADD_CART: 'ADD_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
};

export const addCart = () => ({
  type: actionTypes.ADD_CART,
});

export const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

export const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});
