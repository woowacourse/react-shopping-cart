import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

export const getCartItemsRequest = createAsyncThunk('cartItems/get', async (thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/customers/${customer_name}/carts`);
    const tempItems = res.data.map((item) => ({ ...item, quantity: 1, checked: true }));

    return tempItems;
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

export const deleteItemFromCartRequest = createAsyncThunk('cartItem/delete', async (cart_id, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/customers/${customer_name}/carts/${cart_id}`);

    return cart_id;
  } catch (error) {
    return Object.assign(thunkAPI.rejectWithValue(error), {
      message: '장바구니에서 상품을 삭제하는 데 실패했습니다.',
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

      return {
        ...state,
        cartItemsInServer: [
          ...state.cartItemsInServer.slice(0, targetIndex),
          { ...cartItem, quantity: Number(cartItem.quantity) + 1 },
          ...state.cartItemsInServer.slice(targetIndex + 1),
        ],
      };
    },

    decreaseQuantity: (state, { payload: id }) => {
      const targetIndex = state.cartItemsInServer.findIndex((value) => value.product_id === id);
      if (targetIndex === -1) {
        return state.cartItemsInServer;
      }
      const cartItem = state.cartItemsInServer[targetIndex];

      return {
        ...state,
        cartItemsInServer: [
          ...state.cartItemsInServer.slice(0, targetIndex),
          { ...cartItem, quantity: Number(cartItem.quantity) - 1 },
          ...state.cartItemsInServer.slice(targetIndex + 1),
        ],
      };
    },
    deleteItemFromCart: (state, { payload }) => {
      state.cartItemsInServer.filter((item) => item.cart_id !== Number(payload));
    },
    toggleCheckbox: (state, { payload: id }) => {
      state.cartItemsInServer = state.cartItemsInServer.map((item) => {
        if (item.product_id === id) {
          return { ...item, checked: !item.checked };
        }
        return { ...item };
      });
    },
    allCheck: (state) => {
      state.cartItemsInServer = state.cartItemsInServer.map((item) => ({ ...item, checked: true }));
    },
    allUnCheck: (state) => {
      state.cartItemsInServer = state.cartItemsInServer.map((item) => ({ ...item, checked: false }));
    },
  },
  extraReducers: {
    [addItemToCartRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
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

    [deleteItemFromCartRequest.pending]: (state) => {
      state.errorMessage = '';
      state.loading = true;
    },

    [deleteItemFromCartRequest.fulfilled]: (state, action) => {
      console.log('a', action);
      state.errorMessage = '';
      state.loading = false;
      state.cartItemsInServer = state.cartItemsInServer.filter((item) => item.cart_id !== Number(action.payload));
    },

    [deleteItemFromCartRequest.rejected]: (state, action) => {
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
