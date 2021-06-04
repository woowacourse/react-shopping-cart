import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({ userReducer, cartReducer });

export const store = createStore(rootReducer, composeWithDevTools());
