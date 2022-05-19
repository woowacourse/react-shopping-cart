import { combineReducers } from "redux";
import { productReducer } from "./product";
import { productsReducer } from "./products";

const rootReducer = combineReducers({
  product: productReducer,
  products: productsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
