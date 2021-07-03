import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import api from '../api';
import API from '../constants/api';
import MESSAGE from '../constants/messages';
import * as T from '../types';

export const GET_PRODUCTS = 'product/GET_PRODUCTS' as const;

export type ProductState = {
  data: T.Product[];
  status: T.AsyncStatus;
  error: SerializedError | null;
};

const initialState: ProductState = {
  data: [],
  status: T.AsyncStatus.IDLE,
  error: null,
};

export const getProducts = createAsyncThunk<
  ProductState['data'],
  void,
  {
    rejectValue: SerializedError;
  }
>(GET_PRODUCTS, async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<T.Product[]>(API.PRODUCTS);
    const products = response.data;

    return products;
  } catch (error) {
    return rejectWithValue({ message: MESSAGE.GET_PRODUCTS_FAILURE, stack: error.stack });
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = T.AsyncStatus.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    builder.addDefaultCase(() => {});
  },
});

export default productSlice;
