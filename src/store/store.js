import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './products';
import cartsReducer from './carts';

const rootReducer = combineReducers({ productsReducer, cartsReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
