import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './Cart/reducer';
import ordersReducer from './Orders/reducer';
import productListReducer from './ProductList/reducer';

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
