import { combineReducers } from 'redux';
import product from './product';
import shoppingCart from './shoppingCart';

const rootReducer = combineReducers({
  product,
  shoppingCart,
});

export default rootReducer;
