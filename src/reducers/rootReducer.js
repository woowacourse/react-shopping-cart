import { combineReducers } from 'redux';
import productsReducer from 'reducers/products/products.reducer';
import cartReducer from 'reducers/cart/cart.reducer';

const rootReducer = () =>
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
  });

export default rootReducer;
