import { createStore, combineReducers } from "redux";

import cartReducer from "./modules/cart";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
