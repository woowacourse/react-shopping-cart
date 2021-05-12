import { combineReducers } from 'redux';
import { productsReducer } from './products/reducers';
import { cartReducer } from './cartItems/reducers';
import { ordersReducer } from './orders/reducers';

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  ordersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
