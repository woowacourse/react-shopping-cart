import { createSlice } from '@reduxjs/toolkit';

const productQuantitySlice = createSlice({
  name: 'productQuantity',
  initialState: {
    isOpended: 0,
  },
  reducers: {
    open(state) {
      state.isOpended += true;
    },
    close(state) {
      state.isOpended += false;
    },
  },
});

export const { open, close } = productQuantitySlice.actions;

export default productQuantitySlice.reducer;
