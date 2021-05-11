import { combineReducers, createStore } from 'redux';
import cartReducer from './Cart/reducer';
import ordersReducer from './Orders/reducer';
import productListReducer from './ProductList/reducer';

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer);

export default store;
