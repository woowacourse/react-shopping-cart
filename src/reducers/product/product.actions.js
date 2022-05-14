export const actionTypes = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_ERROR: 'GET_PRODUCT_ERROR',
};

export const getProduct = () => ({
  type: actionTypes.GET_PRODUCT,
});

export const getProductSuccess = (data) => ({
  type: actionTypes.GET_PRODUCT_SUCCESS,
  data,
});

export const getProductError = () => ({
  type: actionTypes.GET_PRODUCT_ERROR,
});
