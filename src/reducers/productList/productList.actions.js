export const actionTypes = {
  GET_PRODUCT_LIST: 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_SUCCESS: 'GET_PRODUCT_LIST_SUCCESS',
  GET_PRODUCT_LIST_ERROR: 'GET_PRODUCT_LIST_ERROR',
};

export const getProductList = () => ({
  type: actionTypes.GET_PRODUCT_LIST,
});

export const getProductListSuccess = (data) => ({
  type: actionTypes.GET_PRODUCT_LIST_SUCCESS,
  data,
});

export const getProductListError = () => ({
  type: actionTypes.GET_PRODUCT_LIST_ERROR,
});
