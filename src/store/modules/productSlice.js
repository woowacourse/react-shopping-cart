import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MESSAGE } from "../../constants/constants";

export const getProducts = createAsyncThunk(
  "product/load",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
      return res.json();
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_GET_PRODUCT_LIST,
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], loading: false, errorMessage: "" },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload.data;
      state.loading = false;
    },

    [getProducts.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
