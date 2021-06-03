import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils';
import { handleRejected } from './util';

export const getProductsThunk = createAsyncThunk(
  'product/getProductThunk',
  async () => {
    try {
      const response = await request.get('/api/products');

      return { products: response.data };
    } catch (error) {
      console.error(error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: {
    [getProductsThunk.fulfilled]: (state, { payload: { products } }) => {
      state.products = products;
    },
    [getProductsThunk.rejected]: handleRejected,
  },
});

export const productReducer = productSlice.reducer;

export default productSlice;
