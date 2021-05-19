import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  middleware: [thunk],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
