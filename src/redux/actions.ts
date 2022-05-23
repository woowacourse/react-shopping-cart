import axios from 'axios';
import SERVER_URL from '../configs/api';

const TYPES = {
  GET_PRODUCT_LIST: 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_PENDING: 'GET_PRODUCT_PENDING',
  GET_PRODUCT_LIST_FULFILLED: 'GET_PRODUCT_FULFILLED',
  GET_PRODUCT_LIST_REJECTED: 'GET_PRODUCT_REJECTED',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_PENDING: 'GET_PRODUCT_DETAIL_PENDING',
  GET_PRODUCT_DETAIL_FULFILLED: 'GET_PRODUCT_DETAIL_FULFILLED',
  GET_PRODUCT_DETAIL_REJECTED: 'GET_PRODUCT_DETAIL_REJECTED',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  HANDLE_CHANGE_QUANTITY: 'HANDLE_CHANGE_QUANTITY',
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
  addItemToCart: (id: string, quantity: number) => {
    return { type: TYPES.ADD_ITEM_TO_CART, payload: { id, quantity } };
  },
  getCartItems: (ids?: Array<String>) => {
    const query =
      ids && ids.length > 0 ? `?${ids.map((id) => `id=${id}`).join('&')}` : '';
    const url = `${SERVER_URL}/products${query}`;
    const request = axios.get(url).then((res) => res.data);

    return { type: TYPES.GET_CART_ITEMS, payload: request };
  },
  handleChangeQuantity: (id: string, quantity: string) => {
    console.log(id, quantity);
    return { type: TYPES.HANDLE_CHANGE_QUANTITY, payload: { id, quantity } };
  },
  handleCheck: (id: string, checked: boolean) => {
    return { type: TYPES.HANDLE_CHECK, payload: { id, checked } };
  },
  removeCartItem: (id: string | string[]) => {
    const idList = Array.isArray(id) ? id : [id];

    return { type: TYPES.REMOVE_CART_ITEM, payload: idList };
  },
};

export { TYPES, actions };
