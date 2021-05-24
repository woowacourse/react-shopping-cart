import { combineReducers } from 'redux';
import { cartReducer } from './cartItems/reducers';

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
