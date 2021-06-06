import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
