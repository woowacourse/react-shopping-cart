import { createSlice, current } from "@reduxjs/toolkit";
import { getProductsAsync } from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], loading: false, errorMessage: "" },
  reducers: {
    resetError: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [getProductsAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getProductsAsync.fulfilled]: (state, action) => {
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

    [getProductsAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const { resetError } = productSlice.actions;

export default productSlice.reducer;
