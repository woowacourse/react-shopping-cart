import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ORDER_API_ENDPOINT } from "../../constants/endpoint";
import format from "../../utils/format";
import http from "../../utils/http";

export const selectOrdersList = (state) => state.order.list;

export const selectOrderStatus = (state) => state.order.status;

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const orders = await http.get(ORDER_API_ENDPOINT);

  return orders.map(format.order);
});

export const orderCartItems = createAsyncThunk(
  "order/orderCartItems",
  async (cart) => {
    const order = cart.map(({ cartId, quantity }) => ({
      cart_id: cartId,
      quantity,
    }));

    const orderId = await http.post(ORDER_API_ENDPOINT, { body: order });

    const newOrder = await http.get(`${ORDER_API_ENDPOINT}/${orderId}`);

    return format.order(newOrder);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { list: [], status: STATUS.IDLE, error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = STATUS.IDLE;
    },
  },
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

export const { resetStatus } = orderSlice.actions;

export default orderSlice.reducer;
