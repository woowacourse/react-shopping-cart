import actionTypes from 'reducers/product/product.actionTypes';

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
