import { Product } from 'types';

const types = {
  GET_PRODUCT_LIST: 'GET_PRODUCT',
  GET_PRODUCT_LIST_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_LIST_ERROR: 'GET_PRODUCT_ERROR',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_SUCCESS: 'GET_PRODUCT_DETAIL_SUCCESS',
  GET_PRODUCT_DETAIL_ERROR: 'GET_PRODUCT_DETAIL_ERROR',
} as const;

const actions = {
  getProductList: () => {
    return { type: types.GET_PRODUCT_LIST };
  },
  getProductListSuccess: (data: Array<Product>) => {
    return { type: types.GET_PRODUCT_LIST_SUCCESS, payload: data };
  },
  getProductListError: () => {
    return { type: types.GET_PRODUCT_LIST_ERROR };
  },
  getProductDetail: () => {
    return { type: types.GET_PRODUCT_DETAIL };
  },
  getProductDetailSuccess: (data: Product) => {
    return { type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: data };
  },
  getProductDetailError: () => {
    return { type: types.GET_PRODUCT_DETAIL_ERROR };
  },
};

export { types, actions };
