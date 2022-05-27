import { combineReducers } from 'redux';
import cartReducer from 'reducers/cart/cart.reducer';

const rootReducer = () =>
  combineReducers({
    cart: cartReducer,
  });

export default rootReducer;
