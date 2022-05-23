import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

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
    loading: true,
    data: [],
    error: false,
  },
  reducers: {
    selectCart(state, action) {
      state.data = current(state).data.map((cart) =>
        cart.id === action.payload ? { ...cart, selected: true } : cart,
      );
    },

    clearCart(state, action) {
      state.data = current(state).data.map((cart) =>
        cart.id === action.payload ? { ...cart, selected: false } : cart,
      );
    },

    selectAllCart(state) {
      state.data = current(state).data.map((cart) => ({ ...cart, selected: true }));
    },

    clearAllCart(state) {
      state.data = current(state).data.map((cart) => ({ ...cart, selected: false }));
    },

    addOneQuantity(state, action) {
      state.data = current(state).data.map((cart) =>
        cart.id === action.payload ? { ...cart, quantity: cart.quantity + 1 } : cart,
      );
    },

    downOneQuantity(state, action) {
      state.data = current(state).data.map((cart) =>
        cart.id === action.payload ? { ...cart, quantity: cart.quantity - 1 } : cart,
      );
    },

    deleteOneCart(state, action) {
      state.data = current(state).data.filter(({ id }) => id !== action.payload);
    },

    deleteSeveralCarts(state, action) {
      state.data = current(state).data.filter(({ id }) => !action.payload.includes(id));
    },
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
  },
});

export const {
  selectCart,
  clearCart,
  selectAllCart,
  clearAllCart,
  addOneQuantity,
  downOneQuantity,
  deleteOneCart,
  deleteSeveralCarts,
} = cartsSlice.actions;

export default cartsSlice.reducer;
