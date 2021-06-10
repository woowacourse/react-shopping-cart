import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../../constants/constant";

export const getOrdersAsync = createAsyncThunk(
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

export const addOrderAsync = createAsyncThunk(
  "order/add",
  async ({ cart }, { rejectWithValue }) => {
    try {
      const order = cart.map((item) => ({
        cart_id: item.order_id,
        quantity: item.amount,
      }));

      const res = await fetch(`${API.ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        return { cart, location: res.headers.get("location") };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_ADD_TO_ORDER,
      });
    }
  }
);
