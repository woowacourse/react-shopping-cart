import { combineReducers } from 'redux';
import shoppingCartReducers from './shoppingCartReducers';

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducers,
});

export default rootReducer;
