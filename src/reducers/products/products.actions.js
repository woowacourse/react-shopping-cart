export const actionTypes = {
  GET_PRODUCTS_REQUEST: 'GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR: 'GET_PRODUCTS_ERROR',
};

export const getProductsRequest = () => ({
  type: actionTypes.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (data) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  data,
});

export const getProductsError = () => ({
  type: actionTypes.GET_PRODUCTS_ERROR,
});
