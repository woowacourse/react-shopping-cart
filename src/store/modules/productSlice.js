import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../constants/constant";

export const getProducts = createAsyncThunk(
  "product/load",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API.GET_PRODUCTS);
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
      action.payload.forEach((product) => {
        const {
          product_id: productId,
          price,
          name,
          image_url: imageUrl,
        } = product;

        if (productId in state.products) return;

        state.products[productId] = {
          id: productId,
          price,
          name,
          thumbnail: imageUrl,
        };
      });

      state.loading = false;
    },

    [getProducts.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
