import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from 'api';
import * as T from '../types';

export interface CartState {
  cartItems: {
    data: T.CartItem[];
    status: T.AsyncStatus;
    error: Error | null;
  };
}

const initialState: CartState = {
  cartItems: {
    data: [],
    status: T.AsyncStatus.IDLE,
    error: null,
  },
};

export const getCartItems = createAsyncThunk('cartItems/get', async () => {
  try {
    const response = await api.get('customers/zigsong/carts');

    return { cartItems: response.data };
  } catch (error) {
    return error;
  }
});

export const addCartItem = createAsyncThunk('cartItems/add', async (product: T.Product) => {
  try {
    const response = await api.post('customers/zigsong/carts', { product_id: product.product_id });
    const { location } = response.headers;
    const cartId = location.substring(location.lastIndexOf('/') + 1);

    return { cartId, product };
  } catch (error) {
    return { error };
  }
});

export const deleteCartItems = createAsyncThunk('cartItems/delete', async (ids: T.CartItem['cart_id'][]) => {
  try {
    await Promise.all(ids.map((id) => api.delete(`customers/zigsong/carts/${id}`)));

    return { ids };
  } catch (error) {
    return error;
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: ({ cartItems }, action: PayloadAction<{ id: T.CartItem['cart_id']; quantity: number }>) => {
      const target = cartItems.data.find((item) => item.cart_id === action.payload.id);
      if (target) target.quantity = action.payload.quantity;
    },
    checkCartItem: ({ cartItems }, action: PayloadAction<{ id: T.CartItem['cart_id']; checked: boolean }>) => {
      const target = cartItems.data.find((item) => item.cart_id === action.payload.id);
      if (target) target.checked = action.payload.checked;
      cartItems.status = T.AsyncStatus.IDLE;
    },
    checkAllCartItems: ({ cartItems }, action: PayloadAction<{ checked: boolean }>) => {
      cartItems.data = [...cartItems.data].map((item) => ({ ...item, checked: action.payload.checked }));
      cartItems.status = T.AsyncStatus.IDLE;
    },
  },
  extraReducers: {
    // get
    [getCartItems.pending.type]: ({ cartItems }) => {
      cartItems.status = T.AsyncStatus.PENDING;
      cartItems.error = null;
    },
    [getCartItems.fulfilled.type]: ({ cartItems }, action: PayloadAction<{ cartItems: T.CartItem[] }>) => {
      const newCartItems = action.payload.cartItems.map((item: T.CartItem) => ({
        ...item,
        quantity: 1,
        checked: true,
      }));
      cartItems.data = newCartItems;
      cartItems.status = T.AsyncStatus.SUCCESS;
      cartItems.error = null;
    },
    [getCartItems.rejected.type]: ({ cartItems }, action: PayloadAction<{ error: AxiosError }>) => {
      cartItems.status = T.AsyncStatus.FAILURE;
      cartItems.error = action.payload.error;
    },
    // add
    [addCartItem.pending.type]: ({ cartItems }) => {
      cartItems.status = T.AsyncStatus.PENDING;
      cartItems.error = null;
    },
    [addCartItem.fulfilled.type]: (
      { cartItems },
      action: PayloadAction<{ cartId: T.CartItem['cart_id']; product: T.Product }>
    ) => {
      cartItems.status = T.AsyncStatus.SUCCESS;
      cartItems.error = null;
      cartItems.data.push({
        cart_id: action.payload.cartId,
        quantity: 1,
        checked: true,
        ...action.payload.product,
      });
    },
    [addCartItem.rejected.type]: ({ cartItems }, action: PayloadAction<{ error: AxiosError }>) => {
      cartItems.status = T.AsyncStatus.FAILURE;
      cartItems.error = action.payload.error;
    },
    // delete
    [deleteCartItems.pending.type]: ({ cartItems }) => {
      cartItems.status = T.AsyncStatus.PENDING;
      cartItems.error = null;
    },
    [deleteCartItems.fulfilled.type]: ({ cartItems }, action: PayloadAction<{ ids: T.CartItem['cart_id'][] }>) => {
      cartItems.data = cartItems.data.filter((item) => !action.payload.ids.includes(item.cart_id));
      cartItems.status = T.AsyncStatus.SUCCESS;
      cartItems.error = null;
    },
    [deleteCartItems.rejected.type]: ({ cartItems }, action: PayloadAction<{ error: AxiosError }>) => {
      cartItems.status = T.AsyncStatus.FAILURE;
      cartItems.error = action.payload.error;
    },
  },
});

export const { updateQuantity, checkCartItem, checkAllCartItems } = cartSlice.actions;

export default cartSlice.reducer;
