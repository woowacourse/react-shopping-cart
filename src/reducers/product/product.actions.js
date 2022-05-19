export const actionTypes = {
  GET_PRODUCT_REQUEST: 'GET_PRODUCT_REQUEST',
  GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_ERROR: 'GET_PRODUCT_ERROR',
};

export const getProductRequest = () => ({
  type: actionTypes.GET_PRODUCT_REQUEST,
});

export const getProductSuccess = (data) => ({
  type: actionTypes.GET_PRODUCT_SUCCESS,
  data,
});

export const getProductError = () => ({
  type: actionTypes.GET_PRODUCT_ERROR,
});
