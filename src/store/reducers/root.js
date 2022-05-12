import { combineReducers } from 'redux';
import productReducer from './product';

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
