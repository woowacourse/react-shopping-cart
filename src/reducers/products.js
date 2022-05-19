import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from 'service';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await getApi('products');

      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    [getProducts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default productsSlice.reducer;
