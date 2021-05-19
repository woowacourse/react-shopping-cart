import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';

const rootReducer = combineReducers({ productReducer, cartReducer, orderReducer });

export const store = createStore(rootReducer, composeWithDevTools());
