import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

import cartReducer from "./modules/cart";
import productsReducer from "./modules/products";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

export default store;
