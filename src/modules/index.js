import { combineReducers } from 'redux';

import product from './product';
import cart from './cart';
import modal from './modal';

const rootReducer = combineReducers({
  product,
  cart,
  modal,
});

export default rootReducer;
