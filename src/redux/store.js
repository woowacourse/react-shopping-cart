import { configureStore } from '@reduxjs/toolkit';
import { shoppingCartItemSlice } from './slice';

const store = configureStore({
  reducer: {
    myShoppingCartReducer: shoppingCartItemSlice.reducer,
  },
});

export { store };
