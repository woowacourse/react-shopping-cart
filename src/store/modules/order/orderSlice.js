import { createSlice } from "@reduxjs/toolkit";
import { addOrderAsync, getOrdersAsync } from "./orderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: { items: {}, loading: false, errorMessage: "" },
  reducers: {
    resetError: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [getOrdersAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getOrdersAsync.fulfilled]: (state, action) => {
      action.payload.forEach((order) => {
        state.items[order.order_id] = order;
      });
      state.loading = false;
    },

    [getOrdersAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [addOrderAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [addOrderAsync.fulfilled]: (state) => {
      state.loading = false;
    },

    [addOrderAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const { resetError } = orderSlice.actions;
export default orderSlice.reducer;
