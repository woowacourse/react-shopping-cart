import { deleteCartItem, getCartItems, postCartItem } from './rest/cart';
import { getProducts, getProduct, putProduct } from './rest/product';

export const handlers = [
  getProducts,
  getProduct,
  putProduct,
  getCartItems,
  postCartItem,
  deleteCartItem,
];
