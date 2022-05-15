import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsReducer from "redux/products/products.reducer";
import cartsReducer from "redux/carts/carts.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products", "carts"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export default persistReducer(persistConfig, rootReducer);
