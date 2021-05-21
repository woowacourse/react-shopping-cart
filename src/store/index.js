import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './cartReducer';
import { itemListReducer } from './itemListReducer';
import { orderListReducer } from './orderListReducer';

const rootReducer = combineReducers({ itemListReducer, cartReducer, orderListReducer });

export const store = createStore(rootReducer, composeWithDevTools());
