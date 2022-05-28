import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    onMessage: (state, action) => ({ show: true, message: action.payload }),
  },
});

export const { onMessage } = snackbarSlice.actions;

export default snackbarSlice.reducer;
