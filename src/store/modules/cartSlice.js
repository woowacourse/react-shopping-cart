import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { cartAPI } from "../../utils/api";

export const selectCartStatus = (state) => state.cart.status;

export const selectCartItemByProductId = (state, productId) =>
  state.cart.list[productId];

export const selectCartItemByCartId = (state, cartId) =>
  Object.values(state.cart.list).find((item) => item.cartId === cartId);

export const selectAllCartItems = (state) => Object.values(state.cart.list);

export const selectCheckedCartItems = (state) =>
  Object.values(state.cart.list).filter((item) => item.checked);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () =>
  cartAPI.fetch()
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    const { productId } = product;

    const state = thunkAPI.getState();

    if (state.cart.list[productId]) {
      return { productId };
    }

    const cartId = await cartAPI.addToCartByProductId(productId);

    return { cartId, ...product, checked: true, quantity: 1 };
  }
);

export const deleteItemByCartId = createAsyncThunk(
  "cart/deleteItemByCartId",
  async (cartId, thunkAPI) => {
    await cartAPI.deleteItemByCartId(cartId);

    const deletedItem = selectCartItemByCartId(thunkAPI.getState(), cartId);

    return deletedItem;
  }
);

export const deleteCheckedItems = createAsyncThunk(
  "cart/deleteCheckedItems",
  async (_, thunkAPI) => {
    const checkedItems = selectCheckedCartItems(thunkAPI.getState());

    const requests = checkedItems.map(({ cartId }) =>
      cartAPI.deleteItemByCartId(cartId)
    );

    Promise.all(requests);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: {},
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {
    toggleChecked: (state, action) => {
      const { productId, checked } = action.payload;
      state.list[productId].checked = checked;
    },

    toggleAllChecked: (state, action) => {
      const { checked } = action.payload;
      Object.keys(state.list).forEach((productId) => {
        state.list[productId].checked = checked;
      });
    },

    changeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.list[productId].quantity = quantity;
    },
  },
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.list = action.payload;
    },
    [fetchCart.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
    },

    [addToCart.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;

      const { productId, ...item } = action.payload;

      if (state.list[productId]) {
        state.list[productId].quantity += 1;
      } else {
        state.list[productId] = {
          productId,
          quantity: 1,
          checked: true,
          ...item,
        };
      }
    },
    [addToCart.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
    },

    [deleteItemByCartId.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [deleteItemByCartId.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;

      const deletedItem = action.payload;

      delete state.list[deletedItem.productId];
    },
    [deleteItemByCartId.rejected]: (state) => {
      state.status = STATUS.FAILED;
    },

    [deleteCheckedItems.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [deleteCheckedItems.fulfilled]: (state) => {
      state.status = STATUS.SUCCEEDED;

      Object.values(state.list)
        .filter((item) => item.checked)
        .forEach((item) => delete state.list[item.productId]);
    },
    [deleteCheckedItems.rejected]: (state) => {
      state.status = STATUS.FAILED;
    },
  },
});

export const {
  toggleChecked,
  toggleAllChecked,
  changeQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
