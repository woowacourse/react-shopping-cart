import PATH from 'constants/path';
import { Product } from 'types';
import SERVER_URL from 'configs/api';
import axios from 'axios';

const types = {
  GET_PRODUCT_LIST: 'GET_PRODUCT',
  GET_PRODUCT_LIST_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_LIST_ERROR: 'GET_PRODUCT_ERROR',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_PENDING: 'GET_PRODUCT_DETAIL_PENDING',
  GET_PRODUCT_DETAIL_FULFILLED: 'GET_PRODUCT_DETAIL_FULFILLED',
  GET_PRODUCT_DETAIL_REJECTED: 'GET_PRODUCT_DETAIL_REJECTED',
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
  getProductDetail: (id: string) => {
    const request = axios
      .get(`${SERVER_URL}${PATH.REQUEST_PRODUCT}/${id}`)
      .then((res) => res.data);

    return { type: types.GET_PRODUCT_DETAIL, payload: request };
  },
};

export { types, actions };
