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

export const addCartItem = (data) => ({
  type: actionTypes.ADD_CART_ITEM,
  data,
});

export const addCartItemSuccess = () => ({
  type: actionTypes.ADD_CART_ITEM_SUCCESS,
});

export const addCartItemError = () => ({
  type: actionTypes.ADD_CART_ITEM_ERROR,
});
