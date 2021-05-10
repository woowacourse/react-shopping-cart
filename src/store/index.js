import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cartSlice";
import orderReducer from "./modules/orderSlice";

export default configureStore({
  reducer: { cart: cartReducer, order: orderReducer },
});
