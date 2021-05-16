import { combineReducers } from 'redux';
import cartReducer from './cart';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
