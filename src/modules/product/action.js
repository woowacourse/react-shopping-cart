export const GET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

export const getProductLoading = () => ({ type: GET_PRODUCT_LOADING });
export const getProductSuccess = (products) => ({ type: GET_PRODUCT_SUCCESS, products });
export const getProductFail = () => ({ type: GET_PRODUCT_FAIL });
