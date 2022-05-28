import { combineReducers } from 'redux';
import cart from './cart';
import products from './products';

const rootReducer = combineReducers({
  productsState: products,
  cartState: cart,
});

export default rootReducer;
