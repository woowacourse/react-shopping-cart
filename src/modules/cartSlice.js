import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

export const getCartItemsRequest = createAsyncThunk('cartItems/get', async (thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/customers/${customer_name}/carts`);

    console.log(res.data);
    return res.data;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니 아이템 목록을 불러오는 데 실패했습니다.',
    });
  }
});

export const addItemToCartRequest = createAsyncThunk('cartItem/add', async (productId, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/customers/${customer_name}/carts`, {
      product_id: productId,
    });
    const location = res.headers.location;

    return location;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니에 상품을 추가하는 데 실패했습니다.',
    });
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    increaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state;
      }
      const cartItem = state[targetIndex];

      return [
        ...state.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) + 1 },
        ...state.slice(targetIndex + 1),
      ];
    },
    decreaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state;
      }
      const cartItem = state[targetIndex];

      return [
        ...state.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) - 1 },
        ...state.slice(targetIndex + 1),
      ];
    },
    addItemToCart: (state, { payload: newItem }) => {
      const targetIndex = state.findIndex((value) => value.product_id === newItem.product_id);
      if (targetIndex === -1) {
        return [...state, { ...newItem, quantity: 1, checked: true }];
      }

      const targetItem = state[targetIndex];

      return [
        ...state.slice(0, targetIndex),
        { ...targetItem, quantity: targetItem.quantity + 1 },
        ...state.slice(targetIndex + 1),
      ];
    },
    deleteItemFromCart: (state, { payload }) => {
      state.filter((item) => item.product_id !== payload);
    },
    toggleCheckbox: (state, { payload: id }) => {
      const targetIndex = state.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state;
      }
      const targetItem = state[targetIndex];

      return [
        ...state.slice(0, targetIndex),
        { ...targetItem, checked: !targetItem.checked },
        ...state.slice(targetIndex + 1),
      ];
    },
    allCheck: (state) => {
      state.map((item) => ({ ...item, checked: true }));
    },
    allUnCheck: (state) => {
      state.map((item) => ({ ...item, checked: false }));
    },
  },
  extraReducers: {
    [addItemToCartRequest.pending]: (state) => {
      state.errorMessage = '';
    },

    [addItemToCartRequest.fulfilled]: (state, action) => {
      state.createSlice.push(action.payload);
    },

    [addItemToCartRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
    },
    [getCartItemsRequest.pending]: (state) => {
      state.errorMessage = '';
    },

    [getCartItemsRequest.fulfilled]: (state, action) => {
      state.createSlice.push(action.payload);
    },

    [getCartItemsRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  addItemToCart,
  deleteItemFromCart,
  toggleCheckbox,
  allCheck,
  allUnCheck,
} = cartSlice.actions;

export default cartSlice.reducer;
