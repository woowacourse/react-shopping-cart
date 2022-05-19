import { combineReducers } from "redux";

import productList from "./productList";
import cartList from "./cartList";

export default combineReducers({
  productList,
  cartList,
});
