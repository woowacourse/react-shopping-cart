import { combineReducers } from 'redux';
import cartReducer from 'store/reducers/cart';
import productReducer from 'store/reducers/product';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
