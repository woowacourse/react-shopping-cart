export const actionTypes = {
  GET_CART: 'GET_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
  ADD_CART: 'ADD_CART',
  ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
  ADD_CART_ERROR: 'ADD_CART_ERROR',
};

export const getCart = () => ({
  type: actionTypes.GET_CART,
});

export const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

export const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});

export const addCart = () => ({
  type: actionTypes.ADD_CART,
});

export const addCartSuccess = (data) => ({
  type: actionTypes.ADD_CART_SUCCESS,
  data,
});

export const addCartError = () => ({
  type: actionTypes.ADD_CART_ERROR,
});
