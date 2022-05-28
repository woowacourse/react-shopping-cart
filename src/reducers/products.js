import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from 'service';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (page, { rejectWithValue }) => {
    try {
      const products = await getApi(`products/${page}`);

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
    totalCount: 0,
    error: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload.products;
      state.totalCount = action.payload.totalCount;
    },

    [getProducts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default productsSlice.reducer;
