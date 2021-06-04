import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, { payload: { product } }) => {
      const targetIndex = state.findIndex(
        ({ product_id }) => product_id === product.product_id
      );

      if (targetIndex >= 0) {
        state[targetIndex].quantity++;

        return;
      }

      state.push({ ...product, quantity: 1, isChecked: true });
    },
  },
});

export const cartReducer = cartSlice.reducer;

export default cartSlice;

export const { addProduct } = cartSlice.actions;
