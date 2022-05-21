export const actionTypes = {
  GET_CART_LIST: 'GET_CART_LIST',
  GET_CART_LIST_SUCCESS: 'GET_CART_LIST_SUCCESS',
  GET_CART_LIST_ERROR: 'GET_CART_LIST_ERROR',
};

export const getCartList = () => ({
  type: actionTypes.GET_CART_LIST,
});

export const getCartListSuccess = (data) => ({
  type: actionTypes.GET_CART_LIST_SUCCESS,
  data,
});

export const getCartListError = () => ({
  type: actionTypes.GET_CART_LIST_ERROR,
});
