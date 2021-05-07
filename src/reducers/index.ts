import { combineReducers } from "redux";
import cartReducer from "./cart";
import productsReducer from "./products";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
