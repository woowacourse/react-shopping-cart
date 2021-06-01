import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productAPI } from "../../utils/api";
import STATUS from "../../constants/status";

export const selectAllProducts = (state) => state.product.list;

export const selectProductIds = (state) =>
  state.product.list.map(({ productId }) => productId);

export const selectProductByProductId = (state, productId) =>
  state.product.list.find((item) => item.productId === productId);

export const selectProductStatus = (state) => state.product.status;

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => productAPI.fetch()
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
