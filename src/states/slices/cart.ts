import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<Product>) => {
      // state.items.push(createCartItem(payload));
    },
  },
  extraReducers: {},
});
