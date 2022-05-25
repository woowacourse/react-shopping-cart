import { combineReducers } from 'redux';

import products from './products';
import product from './product';
import cudCart from './cudCart';
import carts from './carts';
import cart from './cart';
import snackbar from './snackbar';

export default combineReducers({
  products,
  product,
  cudCart,
  carts,
  cart,
  snackbar,
});
