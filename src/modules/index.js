import { combineReducers } from 'redux';
import cartReducer from './cart';
import orderReducer from './order';
import productReducer from './product/reducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
