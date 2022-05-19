import { combineReducers } from 'redux';

import products from './products';
import cudCart from './cudCart';

export default combineReducers({
  products,
  cudCart,
});
