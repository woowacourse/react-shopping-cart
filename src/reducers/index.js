import { combineReducers } from 'redux';
import product from './products';
import history from './location';
import loading from './loading';
import cart from './cart';
import order from './order';

const rootReducer = combineReducers({
  product,
  history,
  loading,
  cart,
  order,
});

export default rootReducer;
