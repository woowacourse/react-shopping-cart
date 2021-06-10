import { createAsyncThunk } from "@reduxjs/toolkit";

import { API, MESSAGE } from "../../../constants/constant";

export const getCartsAsync = createAsyncThunk(
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

export const addToCartAsync = createAsyncThunk(
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

export const removeFromCartAsync = createAsyncThunk(
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

export const removeCheckedAsync = createAsyncThunk(
  "cart/remove-checked",
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
