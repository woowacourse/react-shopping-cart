import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, MESSAGE } from "../../constants/constant";

export const getCarts = createAsyncThunk(
  "cart/load",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API.CARTS);

      if (res.ok) {
        return res.json();
      }

      throw Error;
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
      const res = await fetch(`${API.CARTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          product_id: product.id,
        }),
      });

      if (res.ok) {
        return { product, location: res.headers.get("location") };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_ADD_TO_CART,
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (product, { rejectWithValue }) => {
    try {
      const cartId = product.order_id[product.order_id.length - 1];

      const res = await fetch(`${API.CARTS}/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      if (res.ok) {
        return { productId: product.id, cartId };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_DELETE_FROM_CART,
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
  },

  extraReducers: {
    [getCarts.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [getCarts.fulfilled]: (state, action) => {
      // TODO: 아래꺼 작동 안함
      if (state.originItems === action.payload) return;
      state.items = {};

      action.payload.forEach((item) => {
        const {
          cart_id: cartId,
          product_id: productId,
          price,
          name,
          image_url: imageUrl,
        } = item;

        if (state.items[productId]) {
          state.items[productId].order_id.push(cartId);
        } else {
          state.items[productId] = {
            id: productId,
            order_id: [cartId],
            price,
            name,
            thumbnail: imageUrl,
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
      const location = action.payload.location.split("/");
      const orderId = location[location.length - 1];
      if (state.items[id]) {
        state.items[id].order_id.push(orderId);
      } else {
        state.items[id] = {
          id,
          ...product,
          order_id: [orderId],

          addedDate: Date.now(),
          checked: true,
        };
      }
    },

    [addToCart.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [removeFromCart.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [removeFromCart.fulfilled]: (state, action) => {
      const { productId } = action.payload;
      if (state.items[productId].order_id.length > 1) {
        state.items[productId].order_id.pop();
      } else {
        delete state.items[productId];
      }
    },

    [removeFromCart.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  toggleChecked,
  toggleAllChecked,
  removeChecked,
} = cartSlice.actions;

export default cartSlice.reducer;
