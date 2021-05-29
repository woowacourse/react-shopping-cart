import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from 'api';
import snakeToCamel from 'utils/snakeToCamel';
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

export const getCartItems = createAsyncThunk<{ cartItems: T.CartItem[] }>(
  'cartItems/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('customers/zigsong/carts');

      return { cartItems: snakeToCamel(response.data) };
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const addCartItem = createAsyncThunk<{ cartId: T.CartItem['cartId']; product: T.Product }, T.Product>(
  'cartItems/add',
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.post('customers/zigsong/carts', { product_id: product.productId });
      const { location } = response.headers;
      const cartId = location.substring(location.lastIndexOf('/') + 1);

      return { cartId, product };
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItems = createAsyncThunk<{ ids: T.CartItem['cartId'][] }, T.CartItem['cartId'][]>(
  'cartItems/delete',
  async (ids, { rejectWithValue }) => {
    try {
      await Promise.all(ids.map((id) => api.delete(`customers/zigsong/carts/${id}`)));

      return { ids };
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: ({ cartItems }, action: PayloadAction<{ id: T.CartItem['cartId']; quantity: number }>) => {
      const target = cartItems.data.find((item) => item.cartId === action.payload.id);
      if (target) target.quantity = action.payload.quantity;
    },
    checkCartItem: ({ cartItems }, action: PayloadAction<{ id: T.CartItem['cartId']; checked: boolean }>) => {
      const target = cartItems.data.find((item) => item.cartId === action.payload.id);
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
      action: PayloadAction<{ cartId: T.CartItem['cartId']; product: T.Product }>
    ) => {
      cartItems.status = T.AsyncStatus.SUCCESS;
      cartItems.error = null;
      cartItems.data.push({
        cartId: action.payload.cartId,
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
    [deleteCartItems.fulfilled.type]: ({ cartItems }, action: PayloadAction<{ ids: T.CartItem['cartId'][] }>) => {
      cartItems.data = cartItems.data.filter((item) => !action.payload.ids.includes(item.cartId));
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
