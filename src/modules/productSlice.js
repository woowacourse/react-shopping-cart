import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './constant';
import { STATUS } from '../constant';

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
  initialState: { products: [], singleProduct: {}, status: STATUS.IDLE, errorMessage: '' },
  reducers: {
    reset: (state) => ({ ...state, status: STATUS.IDLE }),
  },
  extraReducers: {
    [getProductsRequest.pending]: (state) => {
      state.errorMessage = '';
      state.status = STATUS.LOADING;
    },

    [getProductsRequest.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.status = STATUS.SUCCEED;
    },

    [getProductsRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.status = STATUS.FAILED;
    },

    [getSingleProductRequest.pending]: (state) => {
      state.errorMessage = '';
      state.status = STATUS.LOADING;
    },

    [getSingleProductRequest.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
      state.status = STATUS.SUCCEED;
    },

    [getSingleProductRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.status = STATUS.FAILED;
    },
  },
});

export default productSlice.reducer;
