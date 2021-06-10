import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./modules/product/productSlice";
import cartReducer from "./modules/cart/cartSlice";
import orderReducer from "./modules/order/orderSlice";

export default configureStore({
  reducer: { cart: cartReducer, order: orderReducer, product: productReducer },
});
