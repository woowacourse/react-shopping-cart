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

    return { product, location };
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니에 상품을 추가하는 데 실패했습니다.',
    });
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], loading: false, errorMessage: '' },
  reducers: {
    increaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.cartItems.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItems;
      }
      const cartItem = state.cartItems[targetIndex];

      return [
        ...state.cartItems.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) + 1 },
        ...state.cartItems.slice(targetIndex + 1),
      ];
    },
    decreaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.cartItems.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItems;
      }
      const cartItem = state.cartItems[targetIndex];

      return [
        ...state.cartItems.slice(0, targetIndex),
        { ...cartItem, quantity: Number(cartItem.quantity) - 1 },
        ...state.cartItems.slice(targetIndex + 1),
      ];
    },
    // addItemToCart: (state, { payload: newItem }) => {
    //   const targetItem = state.cartItems.find((item) => item.product_id === newItem.product_id);

    //   if (targetItem) return;
    //   state.cartItems.push(newItem);
    // },
    deleteItemFromCart: (state, { payload }) => {
      state.cartItems.filter((item) => item.product_id !== payload);
    },
    toggleCheckbox: (state, { payload: id }) => {
      const targetIndex = state.cartItems.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItems;
      }
      const targetItem = state.cartItems[targetIndex];

      return [
        ...state.cartItems.slice(0, targetIndex),
        { ...targetItem, checked: !targetItem.checked },
        ...state.cartItems.slice(targetIndex + 1),
      ];
    },
    allCheck: (state) => {
      state.cartItems.map((item) => ({ ...item, checked: true }));
    },
    allUnCheck: (state) => {
      state.cartItems.map((item) => ({ ...item, checked: false }));
    },
  },
  extraReducers: {
    [addItemToCartRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = false;
    },

    [addItemToCartRequest.fulfilled]: (state, action) => {
      state.cartItems.push(action.payload);
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
      state.cartItems.push(action.payload);
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
  // addItemToCart,
  deleteItemFromCart,
  toggleCheckbox,
  allCheck,
  allUnCheck,
} = cartSlice.actions;

export default cartSlice.reducer;
