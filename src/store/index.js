import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./modules/productSlice";
import cartReducer from "./modules/cartSlice";
import orderReducer from "./modules/orderSlice";

export default configureStore({
  reducer: { product: productReducer, cart: cartReducer, order: orderReducer },
});
