import { createSlice } from '@reduxjs/toolkit';

const paymentReducer = createSlice({
  name: 'paymentReducer',
  initialState: [],
  reducers: {
    addPaymentItems: (state, { payload: items }) => {
      const filteredItems = items.filter((item) => item.checked);

      return state.concat(filteredItems);
    },
  },
});

export const { addPaymentItems } = paymentReducer.actions;

export default paymentReducer.reducer;
