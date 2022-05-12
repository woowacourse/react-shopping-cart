import axios from 'axios';
import SERVER_URL from '../configs/api';

const types = {
  GET_PRODUCT_LIST: 'GET_PRODUCT',
  GET_PRODUCT_LIST_PENDING: 'GET_PRODUCT_PENDING',
  GET_PRODUCT_LIST_FULFILLED: 'GET_PRODUCT_FULFILLED',
  GET_PRODUCT_LIST_REJECTED: 'GET_PRODUCT_REJECTED',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_PENDING: 'GET_PRODUCT_DETAIL_PENDING',
  GET_PRODUCT_DETAIL_FULFILLED: 'GET_PRODUCT_DETAIL_FULFILLED',
  GET_PRODUCT_DETAIL_REJECTED: 'GET_PRODUCT_DETAIL_REJECTED',
} as const;

const actions = {
  getProductList: () => {
    const request = axios.get(`${SERVER_URL}/products`).then((res) => res.data);

    return { type: types.GET_PRODUCT_LIST, payload: request };
  },
  getProductDetail: (id: string) => {
    const request = axios
      .get(`${SERVER_URL}/products/${id}`)
      .then((res) => res.data);

    return { type: types.GET_PRODUCT_DETAIL, payload: request };
  },
};

export { types, actions };
