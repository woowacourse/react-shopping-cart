import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemInCart, Product } from '../../types';
import { createItemInCart } from '../../utils/cart';

interface CartState {
  items: ItemInCart[];
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
      state.items.push(createItemInCart(payload));
    },
  },
  extraReducers: {},
});
