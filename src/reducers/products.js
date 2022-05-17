import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from 'service';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await client('products');

      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: true,
    data: [],
    error: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [getProducts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default productsSlice.reducer;
