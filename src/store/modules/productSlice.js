import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { PRODUCT_API_ENDPOINT } from "../../constants/endpoint";
import http from "../../utils/http";
import format from "../../utils/format";

export const selectAllProducts = (state) => state.product.list;

export const selectProductIds = (state) =>
  state.product.list.map(({ productId }) => productId);

export const selectProductByProductId = (state, productId) =>
  state.product.list.find((item) => item.productId === productId);

export const selectProductStatus = (state) => state.product.status;

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const products = await http.get(PRODUCT_API_ENDPOINT);

    return products.map(format.product);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { list: [], status: STATUS.IDLE, error: null },

  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;

      state.list = action.payload;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
    },
  },
});

export default productSlice.reducer;
