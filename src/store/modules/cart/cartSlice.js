import { createSlice, current } from "@reduxjs/toolkit";
import {
  addToCartAsync,
  getCartsAsync,
  removeCheckedAsync,
  removeFromCartAsync,
} from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    loading: false,
    errorMessage: "",
    originItems: [],
  },
  reducers: {
    toggleChecked: (state, action) => {
      const { id } = action.payload;
      state.items[id].checked = !state.items[id].checked;
    },

    toggleAllChecked: (state, action) => {
      const { checked } = action.payload;
      Object.keys(state.items).forEach((id) => {
        state.items[id].checked = checked;
      });
    },

    resetError: (state) => {
      state.errorMessage = "";
    },
  },

  extraReducers: {
    [getCartsAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getCartsAsync.fulfilled]: (state, action) => {
      if (
        JSON.stringify(current(state).originItems) ===
        JSON.stringify(action.payload)
      ) {
        state.loading = false;
        return;
      }

      state.items = {};

      action.payload.forEach((item) => {
        const {
          cart_id: cartId,
          product_id: productId,
          price,
          name,
          image_url: imageUrl,
        } = item;

        state.items[productId] = {
          id: productId,
          order_id: cartId,
          price,
          name,
          amount: 1,
          thumbnail: imageUrl,
          checked: true,
        };
      });

      state.originItems = action.payload;
      state.loading = false;
    },

    [getCartsAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [addToCartAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [addToCartAsync.fulfilled]: (state, action) => {
      const { id, ...product } = action.payload.product;

      if (state.items[id]) {
        state.items[id].amount += 1;
      } else {
        const location = action.payload.location.split("/");
        const orderId = Number(location[location.length - 1]);

        state.items[id] = {
          id,
          ...product,
          order_id: orderId,
          amount: 1,
          addedDate: Date.now(),
          checked: true,
        };
      }

      state.loading = false;
    },

    [addToCartAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [removeFromCartAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [removeFromCartAsync.fulfilled]: (state, action) => {
      const { productId, amount } = action.payload;

      if (state.items[productId].amount <= amount) {
        delete state.items[productId];
      } else {
        state.items[productId].amount -= amount;
      }

      state.loading = false;
    },

    [removeFromCartAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [removeCheckedAsync.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [removeCheckedAsync.fulfilled]: (state, action) => {
      const { products } = action.payload;

      products.forEach((product) => {
        delete state.items[product.id];
      });

      state.loading = false;
    },

    [removeCheckedAsync.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  toggleChecked,
  toggleAllChecked,
  resetError,
} = cartSlice.actions;

export default cartSlice.reducer;
