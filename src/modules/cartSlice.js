import { createSlice } from '@reduxjs/toolkit';

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
