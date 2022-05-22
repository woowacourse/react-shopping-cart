import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { productListReducer, cartListReducer } from "@/redux/reducers";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

export const rootReducer = combineReducers({
  productListState: productListReducer,
  cartListState: cartListReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
}
