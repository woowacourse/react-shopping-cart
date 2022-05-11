import { combineReducers } from "redux";
import productsReducer from "./products/products.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartsReducer from "./carts/carts.reducer";

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
