import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../constants/constant";

export const getProducts = createAsyncThunk(
  "product/load",
  async (_, { rejectWithValue }) => {
    try {
      await fetch(API.GET_PRODUCTS);
      throw Error();
      // return res.json();
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
  reducers: {
    resetError: (state) => {
      state.errorMessage = "";
    },
  },
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

        if (productId in current(state).products) return;

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

export const { resetError } = productSlice.actions;

export default productSlice.reducer;
