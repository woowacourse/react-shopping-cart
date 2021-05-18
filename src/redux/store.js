import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './Cart/reducer';
import loadingReducer from './Loading/reducer';
import messageReducer from './Message/reducer';
import errorMiddleware from './middlewares/errorMiddleware';
import ordersReducer from './Orders/reducer';
import productListReducer from './Products/reducer';

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
  errorMessage: messageReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, errorMiddleware));

export default store;
