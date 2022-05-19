import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from 'service';

export const getCarts = createAsyncThunk('carts/getCarts', async (_, { rejectWithValue }) => {
  try {
    const carts = await getApi('carts');

    return carts;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  extraReducers: {
    [getCarts.pending]: (state) => {
      state.loading = true;
    },

    [getCarts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [getCarts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    [addCart.fulfilled]: (state, action) => {},
  },
});

export default cartsSlice.reducer;
