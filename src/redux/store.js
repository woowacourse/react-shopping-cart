import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './Cart/reducer';
import { setErrorMessage } from './Message/actions';
import messageReducer from './Message/reducer';
import ordersReducer from './Orders/reducer';
import productListReducer from './Products/reducer';
import errorMiddleware from './middlewares/errorMiddleware';

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
  errorMessage: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, errorMiddleware));

export default store;
