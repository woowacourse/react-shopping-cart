import { combineReducers, createStore } from 'redux';
import cartReducer from './Cart/reducer';
import productListReducer from './ProductList/reducer';

const rootReducer = combineReducers({ products: productListReducer, cart: cartReducer });

const store = createStore(rootReducer);

export default store;
