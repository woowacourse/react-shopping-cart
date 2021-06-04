import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, { payload: { product } }) => {
      const targetIndex = state.products.findIndex(
        ({ product_id }) => product_id === product.product_id
      );

      if (targetIndex >= 0) {
        state.products[targetIndex].quantity++;

        return;
      }

      state.products.push({ ...product, quantity: 1, isChecked: true });
    },
    deleteProduct: (state, { payload: { product_id } }) => {
      state.products = state.products.filter(
        product => product.product_id !== product_id
      );
    },
    deleteCheckedProduct: state => {
      state.products = state.products.filter(product => !product.isChecked);
    },
    setChecked: (state, { payload: { product_id, isChecked } }) => {
      state.products.forEach(product => {
        if (product.product_id === product_id) {
          product.isChecked = isChecked;
        }
      });
    },
    setCheckedAll: (state, { payload: { isChecked } }) => {
      state.products.forEach(product => {
        product.isChecked = isChecked;
      });
    },
  },
});

export const cartReducer = cartSlice.reducer;

export default cartSlice;

export const {
  addProduct,
  deleteProduct,
  deleteCheckedProduct,
  setChecked,
  setCheckedAll,
} = cartSlice.actions;
