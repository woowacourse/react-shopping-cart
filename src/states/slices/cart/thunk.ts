import { HTTPError, FetchError } from './../../../utils/error';
import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  requestAddCartItem,
  requestCartItemList,
  requestDeleteCartItem,
  requestDeleteCartItems,
} from '../../../service/request/cart';
import { CartId, CartItem, CartItemOnServer, Product } from '../../../types';
import { CartState, name } from '.';
import { isPendingAction, isRejectedAction } from '../.';

let currentCalledRequest = '';

export const thunkFetchCartItems = createAsyncThunk(
  `${name}/fetchCartItems`,
  (userName: string, thunkAPI) => {
    try {
      currentCalledRequest = requestCartItemList.name;
      return requestCartItemList(userName);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCartId = (response: Response) => {
  const location = response.headers.get('Location');
  const splittedLocation = location?.split('/');

  if (!splittedLocation) throw new Error('response error: no response header - location');

  const cartId = Number(splittedLocation[splittedLocation.length - 1]);

  if (isNaN(cartId)) throw new Error("response error: location doesen't have any cart id");

  return cartId;
};

export const thunkAddItemToCart = createAsyncThunk(
  `${name}/addCartItem`,
  async ({ userName, product }: { userName: string; product: Product }, thunkAPI) => {
    const { productId, imageUrl, name, price } = product;

    try {
      currentCalledRequest = requestAddCartItem.name;

      const result = await requestAddCartItem(userName, productId);
      const cartId = getCartId(result);

      return { cartId, imageUrl, name, price, quantity: 1, checked: true } as CartItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const thunkDeleteCartItem = createAsyncThunk(
  `${name}/deleteCartItem`,
  async ({ userName, cartId }: { userName: string; cartId: CartId }, thunkAPI) => {
    try {
      currentCalledRequest = requestDeleteCartItem.name;

      await requestDeleteCartItem(userName, cartId);
      return cartId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const thunkDeleteCartItems = createAsyncThunk(
  `${name}/deleteCartItems`,
  async ({ userName, items }: { userName: string; items: CartItem[] }, thunkAPI) => {
    try {
      const checkedItemIds = items.filter((item) => item.checked).map((item) => item.cartId);

      currentCalledRequest = requestDeleteCartItems.name;

      return requestDeleteCartItems(userName, checkedItemIds);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<CartState>) => {
  builder.addCase(
    thunkFetchCartItems.fulfilled,
    (state, { payload }: PayloadAction<CartItemOnServer[]>) => {
      payload.forEach((cartItemOnServer) => {
        if (state.items.find((item) => item.cartId === cartItemOnServer.cartId)) return;

        state.items.push({ ...cartItemOnServer, quantity: 1, checked: true });
      });

      state.isLoading = false;
    }
  );

  builder.addCase(thunkAddItemToCart.fulfilled, (state, { payload }: PayloadAction<CartItem>) => {
    state.items.push(payload);
    state.isLoading = false;
  });

  builder.addCase(thunkDeleteCartItem.fulfilled, (state, { payload }: PayloadAction<CartId>) => {
    state.items = state.items.filter((item) => item.cartId !== payload);
    state.isLoading = false;
  });

  builder.addCase(thunkDeleteCartItems.fulfilled, (state) => {
    state.items = state.items.filter((item) => !item.checked);
    state.isLoading = false;
  });

  builder.addMatcher(isPendingAction, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addMatcher(isRejectedAction, (state, { payload }) => {
    state.isLoading = false;
    console.log(payload instanceof HTTPError);
    state.error = new FetchError(currentCalledRequest, payload as HTTPError);
  });
};

export default extraReducers;
