import { createSlice } from '@reduxjs/toolkit';
import { getId } from '../utils';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    totalOrders: [],
  },
  reducers: {
    addOrderedProduct: (state, { payload: { products } }) => {
      state.totalOrders.push({ id: getId(), products });
    },
  },
});

export const orderReducer = orderSlice.reducer;

export default orderSlice;

export const { addOrderedProduct } = orderSlice.actions;
