import { combineReducers } from 'redux';
import product from './product/product';
import cart from './cart/cart';

const rootReducer = combineReducers({
  product,
  cart,
});

export default rootReducer;
