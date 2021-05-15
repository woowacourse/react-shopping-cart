import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { orderAPI } from "../../utils/api";

export const selectOrdersList = (state) => state.order.list;

export const selectOrderStatus = (state) => state.order.status;

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () =>
  orderAPI.fetch()
);

export const orderCartItems = createAsyncThunk(
  "order/orderCartItems",
  async (cart) => orderAPI.orderCartItems(cart)
);

const orderSlice = createSlice({
  name: "order",
  initialState: { list: [], status: STATUS.IDLE, error: null },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.list = action.payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
    },

    [orderCartItems.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [orderCartItems.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.list.push(action.payload);
    },
    [orderCartItems.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
    },
  },
});

export default orderSlice.reducer;
