import { combineReducers } from 'redux';
import product from './product';
import shoppingCart from './shoppingCart';
import orderList from './orderList';

const rootReducer = combineReducers({
  product,
  shoppingCart,
  orderList,
});

export default rootReducer;
