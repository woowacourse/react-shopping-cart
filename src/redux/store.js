import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  cartReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
