import { combineReducers } from 'redux';
import cartSlice from './cartSlice';
import paymentSlice from './paymentSlice';
import productSlice from './productSlice';

const rootReducer = combineReducers({
  cartSlice,
  paymentSlice,
  productSlice,
});

export default rootReducer;
