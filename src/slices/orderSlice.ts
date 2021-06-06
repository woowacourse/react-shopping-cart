import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import api from '../api';
import API from '../constants/api';
import MESSAGE from '../constants/messages';
import * as T from '../types';

export const GET_ORDERS = 'order/GET_ORDERS' as const;
export const ADD_ORDER = 'order/ADD_ORDER' as const;

export type OrderState = {
  data: T.Order[];
  status: T.AsyncStatus;
  error: SerializedError | null;
};

export type OrderAttribute = {
  cart_id: T.CartItem['cartId'];
  quantity: T.CartItem['quantity'];
};

const initialState: OrderState = {
  data: [],
  status: T.AsyncStatus.IDLE,
  error: null,
};

export const getOrders = createAsyncThunk<
  OrderState['data'],
  void,
  {
    rejectValue: SerializedError;
  }
>(GET_ORDERS, async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<T.Order[]>(API.ORDERS);
    const orders = response.data;

    return orders;
  } catch (error) {
    return rejectWithValue({ message: MESSAGE.GET_ORDERS_FAILURE, stack: error.stack });
  }
});

export const addOrder = createAsyncThunk(ADD_ORDER, async (cartItems: OrderAttribute[]) => {
  await api.post(API.ORDERS, JSON.stringify(cartItems));
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.status = T.AsyncStatus.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(addOrder.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(addOrder.fulfilled, (state) => {
      state.status = T.AsyncStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      state.error = action.error;
    });

    builder.addDefaultCase(() => {});
  },
});

export default orderSlice;
