import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cartSlice";
import orderReducer from "./modules/orderSlice";
import productReducer from "./modules/productSlice";

export default configureStore({
  reducer: { cart: cartReducer, order: orderReducer, product: productReducer },
});
