import { combineReducers } from 'redux';
import { productsReducer } from './products/reducers';
import { cartReducer } from './cartItems/reducers';

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
