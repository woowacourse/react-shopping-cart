import { combineReducers } from 'redux';

import products from './products';
import cudCart from './cudCart';
import carts from './carts';

export default combineReducers({
  products,
  cudCart,
  carts,
});
