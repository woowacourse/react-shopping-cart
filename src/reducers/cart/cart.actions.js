import actionTypes from 'reducers/cart/cart.actionTypes';

const getCart = () => ({
  type: actionTypes.GET_CART,
});

const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});

export default {
  getCart,
  getCartSuccess,
  getCartError,
};
