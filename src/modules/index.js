import { combineReducers } from 'redux';
import cart from './cart';
import payment from './payment';

const rootReducer = combineReducers({
  cart,
  payment,
});

export default rootReducer;
