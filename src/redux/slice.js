import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AMOUNT_COUNT } from '../constants';
import { requestProduct } from '../service/product';
import {
  requestAddShoppingCartItem,
  requestDeleteShoppingCartItem,
  requestShoppingCartList,
} from '../service/shoppingCart';

const addShoppingCartItemAsync = createAsyncThunk('addShoppingCartItem', async (newContent, { getState }) => {
  const currentProductIds = getState().myShoppingCartReducer.myShoppingCart.map(item => item.product_id);

  if (currentProductIds.includes(newContent.product_id)) return;

  try {
    const addItemResponse = await requestAddShoppingCartItem(newContent);
    const getProductResponse = await requestProduct(newContent.product_id);

    const newCartId = Number(addItemResponse.headers.get('Location').split('/')[7]);
    const newItem = await getProductResponse.json();

    return { cart_id: newCartId, ...newItem };
  } catch (error) {
    console.error(error);
  }
});

const deleteShoppingCartItemAsync = createAsyncThunk('deleteShoppingCartItem', async targetCartId => {
  await requestDeleteShoppingCartItem(targetCartId);

  return targetCartId;
});

const getMyShoppingCartAsync = createAsyncThunk('getMyShoppingCart', async () => {
  const response = await requestShoppingCartList();

  return await response.json();
});

const shoppingCartItemSlice = createSlice({
  name: 'shoppingCartItem',
  initialState: {
    myShoppingCart: [],
  },
  reducers: {
    increaseAmount: (state, action) => {
      const targetItem = state.myShoppingCart.find(item => item.product_id === action.payload);

      if (targetItem.amount >= AMOUNT_COUNT.MAX) return;

      targetItem.amount += 1;
    },
    decreaseAmount: (state, action) => {
      const targetItem = state.myShoppingCart.find(item => item.product_id === action.payload);

      if (targetItem.amount <= AMOUNT_COUNT.MIN) return;

      targetItem.amount -= 1;
    },
    toggleCheckStatus: (state, action) => {
      const targetItem = state.myShoppingCart.find(item => item.product_id === action.payload);

      targetItem.isChecked = !targetItem.isChecked;
    },
    checkAllItem: state => {
      state.myShoppingCart.forEach(item => (item.isChecked = true));
    },
    uncheckAllItem: state => {
      state.myShoppingCart.forEach(item => (item.isChecked = false));
    },
    deleteShoppingCartItem: (state, action) => {
      state.myShoppingCart = state.myShoppingCart.filter(item => item.product_id !== action.payload);
    },
  },
  extraReducers: {
    [getMyShoppingCartAsync.fulfilled]: (state, action) => {
      state.myShoppingCart = action.payload.map(product => ({ ...product, amount: 1, isChecked: true }));
    },
    [getMyShoppingCartAsync.rejected]: state => {
      state.myShoppingCart = [];
    },
    [addShoppingCartItemAsync.fulfilled]: (state, action) => {
      if (!action.payload) return;

      state.myShoppingCart = [...state.myShoppingCart, { ...action.payload, amount: 1, isChecked: true }];
    },
    [deleteShoppingCartItemAsync.fulfilled]: (state, action) => {
      state.myShoppingCart = state.myShoppingCart.filter(item => item.cart_id !== action.payload);
    },
  },
});

export { shoppingCartItemSlice, addShoppingCartItemAsync, getMyShoppingCartAsync, deleteShoppingCartItemAsync };
