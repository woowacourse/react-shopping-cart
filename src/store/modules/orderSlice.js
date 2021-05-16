import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    addToOrdersList: (state, action) => {
      const { items } = action.payload;
      const id = Object.keys(state).length + 1;

      state[id] = { items, addedDate: Date.now() };
    },
  },
});

export const { addToOrdersList } = orderSlice.actions;

export default orderSlice.reducer;
