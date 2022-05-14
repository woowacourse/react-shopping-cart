export const actionTypes = {
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR: 'GET_PRODUCTS_ERROR',
};

export const getProducts = () => ({
  type: actionTypes.GET_PRODUCTS,
});

export const getProductsSuccess = (data) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  data,
});

export const getProductsError = () => ({
  type: actionTypes.GET_PRODUCTS_ERROR,
});
