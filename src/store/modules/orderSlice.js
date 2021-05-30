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

export const addOrder = createAsyncThunk(
  "order/add",
  async ({ cart }, { rejectWithValue }) => {
    try {
      const order = cart.map((item) => ({
        cart_id: item.order_id,
        quantity: item.amount,
      }));
      console.log("order,", order);

      const res = await fetch(`${API.ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        return { order, location: res.headers.get("location") };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_ADD_TO_ORDER,
      });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { items: {}, loading: false, errorMessage: "" },
  reducers: {},
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

    [addOrder.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [addOrder.fulfilled]: (state, action) => {
      const { order } = action.payload;
      const location = action.payload.location.split("/");
      const orderId = Number(location[location.length - 1]);
      state.items[orderId] = order;
    },

    [addOrder.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export default orderSlice.reducer;
