import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import cartReducer from "./modules/cart";
import productsReducer from "./modules/products";
import snackBarReducer from "./modules/snackBar";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  snackBar: snackBarReducer,
});

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(ReduxThunk))
    : composeWithDevTools(applyMiddleware(ReduxThunk, logger));

const store = createStore(rootReducer, enhancer);

export default store;
