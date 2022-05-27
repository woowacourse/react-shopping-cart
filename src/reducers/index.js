import { combineReducers } from 'redux';

import products from './products';
import product from './product';
import addUpdateDeleteCart from './addUpdateDeleteCart';
import carts from './carts';
import cart from './cart';
import productQuantity from './productQuantity';
import snackbar from './snackbar';

export default combineReducers({
  products,
  product,
  addUpdateDeleteCart,
  carts,
  cart,
  productQuantity,
  snackbar,
});
