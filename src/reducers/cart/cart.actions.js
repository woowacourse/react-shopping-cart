import actionTypes from 'reducers/cart/cart.actionTypes';

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
