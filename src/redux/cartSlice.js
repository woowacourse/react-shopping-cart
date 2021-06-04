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
    setChecked: (state, { payload: { product_id, isChecked } }) => {
      state.forEach(product => {
        if (product.product_id === product_id) {
          product.isChecked = isChecked;
        }
      });
    },
    setCheckedAll: (state, { payload: { isChecked } }) => {
      state.forEach(product => {
        product.isChecked = isChecked;
      });
    },
  },
});

export const cartReducer = cartSlice.reducer;

export default cartSlice;

export const { addProduct, setChecked, setCheckedAll } = cartSlice.actions;
