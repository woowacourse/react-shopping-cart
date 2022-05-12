import axios from 'axios';
import SERVER_URL from '../configs/api';

const types = {
  LOAD_PRODUCTS: 'LOAD_PRODUCT',
  LOAD_PRODUCTS_PENDING: 'LOAD_PRODUCT_PENDING',
  LOAD_PRODUCTS_FULFILLED: 'LOAD_PRODUCT_FULFILLED',
  LOAD_PRODUCTS_REJECTED: 'LOAD_PRODUCT_REJECTED',
  SAVE_PRODUCTS: 'save_product',
  ADD_TO_SHOPPING_CART: 'add_to_shopping_cart',
} as const;

const actions = {
  loadProducts: () => {
    const request = axios.get(`${SERVER_URL}/products`).then((res) => res.data);
    return { type: types.LOAD_PRODUCTS, payload: request };
  },
};

export { types, actions };
