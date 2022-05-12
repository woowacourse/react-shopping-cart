import actionTypes from 'reducers/products/products.actionTypes';

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
