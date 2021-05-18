import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';

export const getProductsRequest = createAsyncThunk('products/get', async (thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);

    return res.data;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '상품 목록을 불러오는 데 실패했습니다.',
    });
  }
});

export const getSingleProductRequest = createAsyncThunk('singleProduct/get', async (productId, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${productId}`);

    return res.data;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '상품 정보를 불러오는 데 실패했습니다.',
    });
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], singleProduct: {}, loading: false, errorMessage: '' },
  reducers: {},
  extraReducers: {
    [getProductsRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
    },

    [getProductsRequest.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },

    [getProductsRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [getSingleProductRequest.pending]: (state) => {
      state.errorMessage = '';
    },

    [getSingleProductRequest.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
    },

    [getSingleProductRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
    },
  },
});

export default productSlice.reducer;
