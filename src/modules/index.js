import { combineReducers } from 'redux';
import cartSlice from './cartSlice';
import paymentSlice from './paymentSlice';

const rootReducer = combineReducers({
  cartSlice,
  paymentSlice,
});

export default rootReducer;
