import { combineReducers } from "redux";

import cartReducer from "./cart";
import productsReducer from "./products";
import orderListReducer from "./orderList";
import alertReducer from "./alert";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orderList: orderListReducer,
  alert: alertReducer,
});

export default rootReducer;
