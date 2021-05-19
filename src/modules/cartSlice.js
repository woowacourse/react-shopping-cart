import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

export const getCartItemsRequest = createAsyncThunk('cartItems/get', async (thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/customers/${customer_name}/carts`);

    return res.data;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니 아이템 목록을 불러오는 데 실패했습니다.',
    });
  }
});

export const addItemToCartRequest = createAsyncThunk('cartItem/add', async (product, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/customers/${customer_name}/carts`, {
      product_id: product.product_id,
    });
    const location = res.headers.location;

    let tempCartItem = Object.assign({}, product);
    Object.assign(tempCartItem, { location: location });
    return { tempCartItem };
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니에 상품을 추가하는 데 실패했습니다.',
    });
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItemsInServer: [], loading: false, errorMessage: '' },
  reducers: {
    increaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.cartItemsInServer.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItemsInServer;
      }
      const cartItem = state.cartItemsInServer[targetIndex];

      return [
        ...state.cartItemsInServer.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) + 1 },
        ...state.cartItemsInServer.slice(targetIndex + 1),
      ];
    },
    decreaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.cartItemsInServer.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItemsInServer;
      }
      const cartItem = state.cartItemsInServer[targetIndex];

      return [
        ...state.cartItemsInServer.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) - 1 },
        ...state.cartItemsInServer.slice(targetIndex + 1),
      ];
    },
    deleteItemFromCart: (state, { payload }) => {
      state.cartItemsInServer.filter((item) => item.product_id !== payload);
    },
    toggleCheckbox: (state, { payload: id }) => {
      const targetIndex = state.cartItemsInServer.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItemsInServer;
      }
      const targetItem = state.cartItemsInServer[targetIndex];

      return [
        ...state.cartItemsInServer.slice(0, targetIndex),
        { ...targetItem, checked: !targetItem.checked },
        ...state.cartItemsInServer.slice(targetIndex + 1),
      ];
    },
    allCheck: (state) => {
      state.cartItemsInServer.map((item) => ({ ...item, checked: true }));
    },
    allUnCheck: (state) => {
      state.cartItemsInServer.map((item) => ({ ...item, checked: false }));
    },
  },
  extraReducers: {
    [addItemToCartRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = false;
    },

    [addItemToCartRequest.fulfilled]: (state, action) => {
      state.cartItemsInServer.push(action.payload.tempCartItem);
      state.loading = false;
    },

    [addItemToCartRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [getCartItemsRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
    },

    [getCartItemsRequest.fulfilled]: (state, action) => {
      state.cartItemsInServer = action.payload;
      state.loading = false;
    },

    [getCartItemsRequest.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
  toggleCheckbox,
  allCheck,
  allUnCheck,
} = cartSlice.actions;

export default cartSlice.reducer;
