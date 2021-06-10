import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../../constants/constant";

export const getProductsAsync = createAsyncThunk(
  "product/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API.GET_PRODUCTS);
      if (res.ok) {
        return res.json();
      }
      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_GET_PRODUCT_LIST,
      });
    }
  }
);
