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
          id,
          amount: 1,
          addedDate: Date.now(),
          checked: true,
        };
      }
    },

    toggleChecked: (state, action) => {
      const { id } = action.payload;
      state[id].checked = !state[id].checked;
    },

    toggleAllChecked: (state, action) => {
      const { checked } = action.payload;
      Object.keys(state).forEach((id) => {
        state[id].checked = checked;
      });
    },
  },
});

export const { addToCart, toggleChecked, toggleAllChecked } = cartSlice.actions;

export default cartSlice.reducer;
