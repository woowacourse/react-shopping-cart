import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from 'service';

export const getCart = createAsyncThunk('carts/getCart', async (productId, { rejectWithValue }) => {
  try {
    const cart = await getApi(`cart/${productId}`);

    return cart;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: true,
    data: null,
    error: false,
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.loading = true;
    },

    [getCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [getCart.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default cartSlice.reducer;
