import axios from 'axios';
import SERVER_URL from '../configs/api';

const TYPES = {
  GET_PRODUCT_LIST: 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_PENDING: 'GET_PRODUCT_LIST_PENDING',
  GET_PRODUCT_LIST_FULFILLED: 'GET_PRODUCT_LIST_FULFILLED',
  GET_PRODUCT_LIST_REJECTED: 'GET_PRODUCT_LIST_REJECTED',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_PENDING: 'GET_PRODUCT_DETAIL_PENDING',
  GET_PRODUCT_DETAIL_FULFILLED: 'GET_PRODUCT_DETAIL_FULFILLED',
  GET_PRODUCT_DETAIL_REJECTED: 'GET_PRODUCT_DETAIL_REJECTED',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  ADD_ITEM_TO_CART_PENDING: 'ADD_ITEM_TO_CART_PENDING',
  ADD_ITEM_TO_CART_FULFILLED: 'ADD_ITEM_TO_CART_FULFILLED',
  ADD_ITEM_TO_CART_REJECTED: 'ADD_ITEM_TO_CART_REJECTED',
  GET_CART: 'GET_CART',
  GET_CART_PENDING: 'GET_CART_PENDING',
  GET_CART_FULFILLED: 'GET_CART_FULFILLED',
  GET_CART_REJECTED: 'GET_CART_REJECTED',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  UPDATE_QUANTITY_PENDING: 'UPDATE_QUANTITY_PENDING',
  UPDATE_QUANTITY_FULFILLED: 'UPDATE_QUANTITY_FULFILLED',
  UPDATE_QUANTITY_REJECTED: 'UPDATE_QUANTITY_REJECTED',
  HANDLE_CHECK: 'HANDLE_CHECK',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
} as const;

const actions = {
  getProductList: (ids?: Array<String>) => {
    const query = ids ? `?${ids.map((id) => `id=${id}`).join('&')}` : '';
    const request = axios
      .get(`${SERVER_URL}/products${query}`)
      .then((res) => res.data);

    return { type: TYPES.GET_PRODUCT_LIST, payload: request };
  },
  getProductDetail: (id: string) => {
    const request = axios
      .get(`${SERVER_URL}/products/${id}`)
      .then((res) => res.data);

    return { type: TYPES.GET_PRODUCT_DETAIL, payload: request };
  },
  getCart: () => {
    const request = axios.get(`${SERVER_URL}/cart`).then((res) => res.data);

    return { type: TYPES.GET_CART, payload: request };
  },
  addItemToCart: (productId: string, quantity: number) => {
    const request = axios
      .post(`${SERVER_URL}/cart`, {
        productId,
        quantity,
      })
      .then((res) => res.data);

    return { type: TYPES.ADD_ITEM_TO_CART, payload: request };
  },
  removeCartItem: (productId: string | string[]) => {
    const productIdList = Array.isArray(productId) ? productId : [productId];
    const query = productIdList.map((productId) => `id=${productId}`).join('&');
    const request = axios
      .delete(`${SERVER_URL}/cart?${query}`)
      .then((res) => res.data);

    return { type: TYPES.REMOVE_CART_ITEM, payload: request };
  },
  updateQuantity: (productId: string, quantity: string) => {
    const request = axios
      .patch(`${SERVER_URL}/cart`, {
        productId,
        quantity,
      })
      .then((res) => res.data);

    return { type: TYPES.UPDATE_QUANTITY, payload: request };
  },
  handleCheck: (id: string, checked: boolean) => {
    return { type: TYPES.HANDLE_CHECK, payload: { id, checked } };
  },
};

export { TYPES, actions };
