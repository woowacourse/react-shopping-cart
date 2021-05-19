import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../constants/constant";

export const getOrders = createAsyncThunk(
  "order/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API.ORDERS);
      return res.json();
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_GET_ORDERS,
      });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { items: [], loading: false, errorMessage: "" },
  reducers: {
    addToOrdersList: (state, action) => {
      const { items } = action.payload;
      const id = Object.keys(state).length + 1;

      state[id] = { items, addedDate: Date.now() };
    },
  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getOrders.fulfilled]: (state, action) => {
      action.payload.forEach((order) => {
        const { order_id: orderId, order_details: orderDetails } = order;

        state.items[orderId] = orderDetails;
      });
    },

    [getOrders.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const { addToOrdersList } = orderSlice.actions;

export default orderSlice.reducer;
