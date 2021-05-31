import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './cartReducer';
import { confirmReducer } from './confirmReducer';

const rootReducer = combineReducers({
  cartReducer,
  confirmReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
