import { combineReducers } from "redux";
import cartReducer from "./cart";
import productsReducer from "./products";
import orderListReducer from "./orderList";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orderList: orderListReducer,
});

export default rootReducer;
