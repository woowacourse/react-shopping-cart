export const GET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

export const GET_DETAIL_PRODUCT_LOADING = 'GET_DEATIL_PRODUCT_LOADING';
export const GET_DETAIL_PRODUCT_SUCCESS = 'GET_DETAIL_PRODUCT_SUCCESS';
export const GET_DETAIL_PRODUCT_FAIL = 'GET_DETAIL_PRODUCT_FAIL';

export const getProductLoading = () => ({ type: GET_PRODUCT_LOADING });
export const getProductSuccess = (products) => ({ type: GET_PRODUCT_SUCCESS, products });
export const getProductFail = (error) => ({ type: GET_PRODUCT_FAIL, error });

export const getDetailProductLoading = () => ({ type: GET_DETAIL_PRODUCT_LOADING });
export const getDetailProductSuccess = (detailProduct) => ({
  type: GET_DETAIL_PRODUCT_SUCCESS,
  detailProduct,
});
export const getDetailProductFail = () => ({ type: GET_DETAIL_PRODUCT_FAIL });
