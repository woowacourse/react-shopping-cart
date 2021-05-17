import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: [],
  reducers: {
    addPaymentItems: (state, { payload: items }) => {
      const filteredItems = items.filter((item) => item.checked);

      return state.concat(filteredItems);
    },
  },
});

export const { addPaymentItems } = paymentSlice.actions;

export default paymentSlice.reducer;
