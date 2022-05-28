import {
  deleteCartProduct,
  loadCartProduct,
  loadCartProductList,
  registerCartProduct,
  updateCartProduct,
} from 'mocks/handlers/cart';
import { loadProduct, loadProductList } from 'mocks/handlers/product';

const handlers = [
  loadProduct,
  loadProductList,
  loadCartProduct,
  loadCartProductList,
  registerCartProduct,
  updateCartProduct,
  deleteCartProduct,
];

export default handlers;
