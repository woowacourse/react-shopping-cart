import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import api from '../api';
import API from '../constants/api';
import * as T from '../types';

export const GET_CART_ITEMS = 'cartItems/GET_CART_ITEMS' as const;
export const ADD_CARD_ITEM = 'cartItems/ADD_CARD_ITEM' as const;
export const DELETE_ITEM = 'cartItems/DELETE_ITEM' as const;
export const DELETE_CHECKED_ITEMS = 'cartItems/DELETE_CHECKED_ITEMS' as const;
export const UPDATE_QUANTITY = 'cartItems/UPDATE_QUANTITY' as const;
export const CHECK_CART_ITEM = 'cartItems/CHECK_CART_ITEM' as const;
export const CHECK_ALL_CART_ITEMS = 'cartItems/CHECK_ALL_CART_ITEMS' as const;

export type CartState = {
  data: T.CartItem[];
  status: T.AsyncStatus;
  error: SerializedError | null;
};

const initialState: CartState = {
  data: [],
  status: T.AsyncStatus.IDLE,
  error: null,
};

export const getCartItems = createAsyncThunk(GET_CART_ITEMS, async () => {
  const response = await api.get(API.CARTS);
  const cartItemsWithQuantity = response.data.map((item: T.CartItem) => ({ ...item, quantity: 1 }));

  return cartItemsWithQuantity as T.CartItem[];
});

export const addCartItem = createAsyncThunk(
  ADD_CARD_ITEM,
  async (productId: T.Product['productId'], { rejectWithValue }) => {
    try {
      const response = await api.post(API.CARTS, { product_id: productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(DELETE_ITEM, async (cartId: T.CartItem['cartId']) => {
  await api.delete(`${API.CARTS}/${cartId}`);

  return cartId;
});

export const deleteCheckedItems = createAsyncThunk(DELETE_CHECKED_ITEMS, async (cartIds: T.CartItem['cartId'][]) => {
  await Promise.all(cartIds.map((id) => api.delete(`${API.CARTS}/${id}`)));

  return cartIds;
});

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,

  reducers: {
    updateQuantity: (
      state,
      action: PayloadAction<{ cartId: T.CartItem['cartId']; quantity: T.CartItem['quantity'] }>
    ) => {
      const target = state.data.find((item) => item.cartId === action.payload.cartId);
      if (target) target.quantity = action.payload.quantity;
      state.status = T.AsyncStatus.IDLE;
    },

    checkCartItem: (state, action: PayloadAction<{ cartId: T.CartItem['cartId']; checked: T.CartItem['checked'] }>) => {
      const target = state.data.find((item) => item.cartId === action.payload.cartId);
      if (target) target.checked = action.payload.checked;
      state.status = T.AsyncStatus.IDLE;
    },

    checkAllCartItems: (state, action: PayloadAction<{ checked: T.CartItem['checked'] }>) => {
      state.data = [...state.data].map((item: T.CartItem) => ({
        ...item,
        checked: action.payload.checked,
      }));
      state.status = T.AsyncStatus.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addCartItem.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(addCartItem.fulfilled, (state) => {
      state.status = T.AsyncStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(addCartItem.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      state.error = action.error;
    });
    builder.addCase(getCartItems.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      const newCartItems = action.payload.map((item: T.CartItem) => ({ ...item, checked: true }));
      state.data = newCartItems;
      state.status = T.AsyncStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      state.error = action.error;
    });
    builder.addCase(deleteItem.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.cartId !== action.payload);
      state.status = T.AsyncStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(deleteItem.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      state.error = action.error;
    });
    builder.addCase(deleteCheckedItems.pending, (state) => {
      state.status = T.AsyncStatus.PENDING;
      state.error = null;
    });
    builder.addCase(deleteCheckedItems.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => !action.payload.includes(item.cartId));
      state.status = T.AsyncStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(deleteCheckedItems.rejected, (state, action) => {
      state.status = T.AsyncStatus.FAILURE;
      state.error = action.error;
    });
    builder.addDefaultCase(() => {});
  },
});

export default cartItemsSlice;
