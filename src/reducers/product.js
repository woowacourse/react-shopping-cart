import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from 'service';

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await getApi(`product/${productId}`);

      return product;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: true,
    data: null,
    error: false,
  },
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.loading = true;
    },

    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    [getProduct.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default productSlice.reducer;
