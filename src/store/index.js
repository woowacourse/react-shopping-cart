import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/localStorage";
import { debounce } from "../utils/utils";
import cartReducer from "./modules/cartSlice";
import orderReducer from "./modules/orderSlice";

const store = configureStore({
  reducer: { cart: cartReducer, order: orderReducer },
  preloadedState: loadState(),
});

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  })
);

export default store;
