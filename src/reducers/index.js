import product from './products';
import history from './location';
import loading from './loading';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  product,
  history,
  loading,
});

export default rootReducer;
