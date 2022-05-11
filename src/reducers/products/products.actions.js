import actionTypes from 'reducers/products/products.actionTypes';

const getProducts = () => ({
  type: actionTypes.GET_PRODUCTS,
});

const getProductsSuccess = (data) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  data,
});

const getProductsError = () => ({
  type: actionTypes.GET_PRODUCTS_ERROR,
});

export default {
  getProducts,
  getProductsSuccess,
  getProductsError,
};
