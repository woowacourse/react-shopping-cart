import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../constants/constant";

export const getCarts = createAsyncThunk(
  "cart/load",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API.GET_CARTS);
      return res.json();
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_GET_CARTS,
      });
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API.ADD_TO_CART}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          product_id: product.id,
        }),
      });

      if (res.ok) {
        return { product };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_ADD_TO_CART,
      });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    loading: false,
    errorMessage: "",
    originItems: [],
  },
  reducers: {
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },
    changeAmount: (state, action) => {
      const { id, amount } = action.payload;
      state.items[id].amount = amount;
    },
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
    removeChecked: (state) => {
      Object.entries(state.items).forEach(([id, item]) => {
        if (item.checked) {
          delete state.items[id];
        }
      });
    },
  },

  extraReducers: {
    [getCarts.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getCarts.fulfilled]: (state, action) => {
      if (state.originItems === action.payload) return;

      action.payload.forEach((item) => {
        const {
          cart_id: cartId,
          product_id: productId,
          price,
          name,
          image_url: imageUrl,
        } = item;

        if (state.items[productId]) {
          state.items[productId].amount += 1;
        } else {
          state.items[productId] = {
            id: productId,
            order_id: cartId,
            price,
            name,
            thumbnail: imageUrl,
            amount: 1,
            checked: true,
          };
        }
      });

      state.originItems = action.payload;
    },

    [getCarts.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
    [addToCart.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [addToCart.fulfilled]: (state, action) => {
      const { id, ...product } = action.payload.product;
      if (state.items[id]) {
        state.items[id].amount += 1;
      } else {
        state.items[id] = {
          id,
          ...product,
          amount: 1,
          addedDate: Date.now(),
          checked: true,
        };
      }
    },

    [addToCart.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  removeFromCart,
  changeAmount,
  toggleChecked,
  toggleAllChecked,
  removeChecked,
} = cartSlice.actions;

export default cartSlice.reducer;
