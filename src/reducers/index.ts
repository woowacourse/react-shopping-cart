import { combineReducers } from "redux";
import productsReducer, { Product, ProductsObject } from "./products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
export { Product, ProductsObject };
