import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postApi, putApi, deleteApi } from 'service';

export const addCart = createAsyncThunk('cudCart/add', async (productId, { rejectWithValue }) => {
  try {
    await postApi(`addCart/${productId}`);
  } catch (error) {
    rejectWithValue(error);
  }
});

export const addMoreCart = createAsyncThunk(
  'cudCart/addMore',
  async (productId, { rejectWithValue }) => {
    try {
      await putApi(`addMoreCart/${productId}`);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const downCart = createAsyncThunk(
  'cudCart/downCart',
  async (productId, { rejectWithValue }) => {
    try {
      await putApi(`downCart/${productId}`);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const deleteCart = createAsyncThunk(
  'cudCart/delete',
  async (productId, { rejectWithValue }) => {
    try {
      await deleteApi(`deleteCart/${productId}`);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const pending = (state) => {
  state.loading = true;
};
const fulfilled = (state) => {
  state.loading = false;
  state.error = false;
};
const rejected = (state) => {
  state.loading = false;
  state.error = true;
};

const cudCartSlice = createSlice({
  name: 'cudCart',
  initialState: {
    loading: false,
    error: false,
  },
  extraReducers: {
    [addCart.pending]: pending,

    [addCart.fulfilled]: fulfilled,

    [addCart.rejected]: rejected,

    [addMoreCart.pending]: pending,

    [addMoreCart.fulfilled]: fulfilled,

    [addMoreCart.rejected]: rejected,

    [deleteCart.pending]: pending,

    [deleteCart.fulfilled]: fulfilled,

    [deleteCart.rejected]: rejected,
  },
});

export default cudCartSlice.reducer;
