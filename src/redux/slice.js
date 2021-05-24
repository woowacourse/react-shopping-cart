import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestTable } from '../api/request';

const addShoppingCartItemAsync = createAsyncThunk('addShoppingCartItem', async (newContent, { getState }) => {
  const currentProductIds = getState().myShoppingCartReducer.myShoppingCart.map(item => item.product_id);

  if (currentProductIds.includes(newContent.product_id)) return;

  const newCartId = await requestTable.POST('carts', newContent);
  const newItem = await requestTable.GET('products', newContent.product_id);

  return { cart_id: newCartId, ...newItem };
});

const deleteShoppingCartItemAsync = createAsyncThunk('deleteShoppingCartItem', async targetCartId => {
  await requestTable.DELETE('carts', targetCartId);

  return targetCartId;
});

const getMyShoppingCartAsync = createAsyncThunk('getMyShoppingCart', async () => {
  const shoppingCartItem = await requestTable.GET('carts');
  return shoppingCartItem;
});

const shoppingCartItemSlice = createSlice({
  name: 'shoppingCartItem',
  initialState: {
    myShoppingCart: [],
  },
  reducers: {
    increaseAmount: (state, action) => {
      const targetItem = state.myShoppingCart.find(item => item.product_id === action.payload);
      targetItem.amount += 1;
    },
    decreaseAmount: (state, action) => {
      const targetItem = state.myShoppingCart.find(item => item.product_id === action.payload);
      targetItem.amount -= 1;
    },
  },
  extraReducers: {
    [getMyShoppingCartAsync.fulfilled]: (state, action) => {
      state.myShoppingCart = action.payload.map(product => ({ ...product, amount: 1 }));
    },
    [getMyShoppingCartAsync.rejected]: state => {
      state.myShoppingCart = [];
    },
    [addShoppingCartItemAsync.fulfilled]: (state, action) => {
      state.myShoppingCart = [...state.myShoppingCart, { ...action.payload, amount: 1 }];
    },
    [deleteShoppingCartItemAsync.fulfilled]: (state, action) => {
      state.myShoppingCart = state.myShoppingCart.filter(item => item.cart_id !== action.payload);
    },
  },
});
console.log(shoppingCartItemSlice.action);
export { shoppingCartItemSlice, addShoppingCartItemAsync, getMyShoppingCartAsync, deleteShoppingCartItemAsync };
