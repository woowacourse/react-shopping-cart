export const actionTypes = {
  GET_CART: 'GET_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
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

export const addCartItem = (item) => ({
  type: actionTypes.ADD_CART_ITEM,
  item,
});
