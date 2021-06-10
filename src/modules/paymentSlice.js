import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUS } from '../constant';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

export const getOrderListRequest = createAsyncThunk('orderList/get', async (thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/customers/${customer_name}/orders`);

    return res.data;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '주문 목록을 불러오는 데 실패했습니다.',
    });
  }
});

export const orderItemsRequest = createAsyncThunk('orderList/order', async (orderList, thunkAPI) => {
  try {
    orderList.map((item) => ({
      cart_id: item.cart_id,
      quantity: item.quantity,
    }));

    const res = await axios.post(`${BASE_URL}/customers/${customer_name}/orders`, orderList);
    const location = res.headers.location;

    let tempCartItem = Object.assign({}, orderList);
    Object.assign(tempCartItem, { location: location });
    return { tempCartItem };
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '상품 결제에 실패했습니다.',
    });
  }
});

const initialState = {
  status: STATUS.IDLE,
  errorMessage: '',
  orderList: [],
  orderedList: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addItemsToOrderList: (state, { payload: items }) => {
      const filteredItems = items.filter((item) => item.checked);

      return { ...state, orderList: filteredItems };
    },
    reset: (state) => ({ ...state, status: STATUS.IDLE }),
  },
  extraReducers: {
    [getOrderListRequest.pending]: (state) => {
      state.errorMessage = '';
      state.status = STATUS.LOADING;
    },

    [getOrderListRequest.fulfilled]: (state, action) => {
      state.orderedList = action.payload;
      state.status = STATUS.SUCCEED;
    },

    [getOrderListRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.status = STATUS.FAILED;
    },

    [orderItemsRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
      state.status = STATUS.LOADING;
    },

    [orderItemsRequest.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = STATUS.SUCCEED;
    },

    [orderItemsRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
      state.status = STATUS.FAILED;
    },
  },
});

export const { addItemsToOrderList, reset } = paymentSlice.actions;

export default paymentSlice.reducer;
