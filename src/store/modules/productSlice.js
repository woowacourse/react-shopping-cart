import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MESSAGE } from "../../constants/constants";

export const getProducts = createAsyncThunk("product/load", async () => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
    return res.json();
  } catch {
    // eslint-disable-next-line no-undef
    return rejectWithValue(MESSAGE.ALERT.FAILED_GET_PRODUCT_LIST);
  }
});

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
      // rejectWithValue 반환타입 : error: { message: string; name, stack }
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
