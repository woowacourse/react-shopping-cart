import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUS } from '../constant';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

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
  loading: false,
  orderList: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addItemsToOrderList: (state, { payload: items }) => {
      const filteredItems = items.filter((item) => item.checked);
      console.log(filteredItems);

      return { ...state, orderList: filteredItems };
    },
    reset: (state) => ({ ...state, status: STATUS.IDLE }),
  },
  extraReducers: {
    [orderItemsRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
      state.status = STATUS.LOADING;
    },

    [orderItemsRequest.fulfilled]: (state, action) => {
      console.log(action);
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
