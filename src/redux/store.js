import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { cartReducer } from './cartReducer';
import { confirmReducer } from './confirmReducer';

const rootReducer = combineReducers({
  cartReducer,
  confirmReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
