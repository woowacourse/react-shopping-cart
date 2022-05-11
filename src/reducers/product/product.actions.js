import actionTypes from 'reducers/product/product.actionTypes';

const getProduct = () => ({
  type: actionTypes.GET_PRODUCT,
});

const getProductSuccess = (data) => ({
  type: actionTypes.GET_PRODUCT_SUCCESS,
  data,
});

const getProductError = () => ({
  type: actionTypes.GET_PRODUCT_ERROR,
});

export default {
  getProduct,
  getProductSuccess,
  getProductError,
};
