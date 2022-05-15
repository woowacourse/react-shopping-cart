import { combineReducers } from 'redux';
import cartReducer from './cart';
import productReducer from './product';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
