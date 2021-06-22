import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { confirmReducer } from './confirmReducer';

const rootReducer = combineReducers({
  confirmReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
