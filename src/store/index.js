import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cartSlice";

export default configureStore({
  reducer: { cart: cartReducer },
});
