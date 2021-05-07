import { combineReducers } from "redux";
import productsReducer from "./products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
