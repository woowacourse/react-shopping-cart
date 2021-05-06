import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { id, ...product } = action.payload.product;
      if (state[id]) {
        state[id].amount += 1;
      } else {
        state[id] = {
          ...product,
          amount: 1,
          addedDate: Date.now(),
        };
      }
    },
    clearCart: () => ({}),
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
