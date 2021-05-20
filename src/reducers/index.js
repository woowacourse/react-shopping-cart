import { combineReducers } from 'redux';
import orderReducer from './order';
import productReducer from './products';

const rootReducer = combineReducers({
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
