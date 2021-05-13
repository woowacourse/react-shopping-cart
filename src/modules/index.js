import { combineReducers } from 'redux';
import shoppingCart from './shoppingCart';

const rootReducer = combineReducers({
  shoppingCart,
});

export default rootReducer;
