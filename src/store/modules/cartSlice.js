import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { API, MESSAGE } from "../../constants/constant";

export const getCarts = createAsyncThunk(
  "cart/load",
  async (_, { rejectWithValue }) => {
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
  async (product, { getState, rejectWithValue }) => {
    const carts = getState().cart.items;
    try {
      const cartItems = Object.values(carts).map(({ id }) => id);

      if (cartItems.includes(product.id)) {
        return { product };
      }
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
  async ({ product, amount }, { getState, rejectWithValue }) => {
    try {
      const carts = getState().cart.items;

      if (carts[product.id].amount > amount) {
        return { productId: product.id, amount };
      }

      const responses = await fetch(
        `${API.CARTS}/${carts[product.id].order_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );

      if (responses.ok) {
        return { productId: product.id, amount };
      }

      throw Error;
    } catch (error) {
      return Object.assign(rejectWithValue(error), {
        message: MESSAGE.ALERT.FAILED_DELETE_FROM_CART,
      });
    }
  }
);

export const removeChecked = createAsyncThunk(
  "cart/remove-checked",
  // eslint-disable-next-line consistent-return
  async (cart, { rejectWithValue }) => {
    try {
      const checkedProducts = Object.values(cart).filter(
        (product) => product.checked
      );

      const cartIds = checkedProducts.map((product) => product.order_id).flat();

      const responses = await Promise.all(
        cartIds.map((id) =>
          fetch(`${API.CARTS}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
        )
      );

      if (responses.every((res) => res.ok)) {
        return { products: checkedProducts };
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
      if (
        JSON.stringify(current(state).originItems) ===
        JSON.stringify(action.payload)
      )
        return;

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
          // 현재는 불필요
          state.items[productId].amount += 1;
        } else {
          state.items[productId] = {
            id: productId,
            order_id: cartId,
            price,
            name,
            amount: 1,
            thumbnail: imageUrl,
            checked: true,
          };
        }
      });

      state.originItems = action.payload;
      state.loading = false;
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

    [addToCart.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [removeFromCart.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [removeFromCart.fulfilled]: (state, action) => {
      const { productId, amount } = action.payload;

      if (state.items[productId].amount <= amount) {
        delete state.items[productId];
      } else {
        state.items[productId].amount -= amount;
      }

      state.loading = false;
    },

    [removeFromCart.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },

    [removeChecked.pending]: (state) => {
      state.errorMessage = "";
      state.loading = true;
    },

    [removeChecked.fulfilled]: (state, action) => {
      const { products } = action.payload;

      products.forEach((product) => {
        delete state.items[product.id];
      });

      state.loading = false;
    },

    [removeChecked.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    },
  },
});

export const { toggleChecked, toggleAllChecked } = cartSlice.actions;

export default cartSlice.reducer;
