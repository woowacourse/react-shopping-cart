import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartId, CartItem } from '../../../types';
import extraReducers from './thunk';
import { CartState, name } from '.';

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeItemQuantity: (
      state,
      { payload }: PayloadAction<{ cartItem: CartItem; quantity: number }>
    ) => {
      const target = state.items.find((item) => item.cartId === payload.cartItem.cartId);

      if (!target) return;

      target.quantity = payload.quantity;
    },

    changeItemChecked: (state, { payload }: PayloadAction<CartId>) => {
      const target = state.items.find((item) => item.cartId === payload);

      if (!target) return;

      target.checked = !target.checked;
    },

    changeAllItemChecked: (state, { payload }: PayloadAction<boolean>) => {
      state.items.forEach((item) => (item.checked = payload));
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers,
});

export const { actions: cartAction } = cartSlice;

export default cartSlice.reducer;
