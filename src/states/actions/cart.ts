import { Dispatch } from 'redux';
import { Action, ActionWithPayload, AppThunk } from '.';
import {
  requestAddShoppingCartItem,
  requestChangeAllShoppingCartItemChecked,
  requestChangeShoppingCartItem,
  requestChangeShoppingCartItemChecked,
  requestClearShoppingCartItems,
  requestDeleteShoppingCartItem,
  requestDeleteShoppingCartItems,
  requestShoppingCartItemList,
} from '../../service/request/cart';
import { CartItem, Product } from '../../types';
import { createCartItem } from '../../utils/cart';

export const LOADING = 'cart/LOADING';
export const ERROR = 'cart/ERROR';

export const ADD_ITEM = 'cart/ADD_ITEM';

export const GET_CART_ITEMS_SUCCESS = 'cart/GET_CART_ITEMS_SUCCESS';
export const ADD_CART_ITEM_SUCCESS = 'cart/ADD_CART_ITEM_SUCCESS';
export const CHANGE_ITEM_QUANTITY_SUCCESS = 'cart/CHANGE_ITEM_QUANTITY_SUCCESS';
export const DELETE_CART_ITEM_SUCCESS = 'cart/DELETE_ITEM_SUCCESS';
export const CHANGE_CART_ITEM_CHECKED_SUCCESS = 'cart/CHANGE_ITEM_CHECKED_SUCCESS';
export const CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS = 'cart/CHANGE_ALL_ITEM_CHECKED_SUCCESS';
export const DELETE_CHECKED_CART_ITEM_SUCCESS = 'cart/DELETE_CHECKED_ITEM_SUCCESS';
export const CLEAR_CART_SUCCESS = 'cart/CLEAR_CART_SUCCESS';

export const addItem = (item: Product): ActionWithPayload<typeof ADD_ITEM, Product> => ({
  type: ADD_ITEM,
  payload: item,
});

export const thunkGetCartItems = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  try {
    const items = await requestShoppingCartItemList();
    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkAddItemToCart = (item: Product): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  try {
    const newCartItem = createCartItem(item);

    await requestAddShoppingCartItem(newCartItem);
    dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: newCartItem });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkChangeItemQuantity = (item: CartItem, quantity: number): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOADING });

  const changedItem = { ...item, quantity };

  try {
    await requestChangeShoppingCartItem(changedItem);
    dispatch({ type: CHANGE_ITEM_QUANTITY_SUCCESS, payload: changedItem });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkDeleteCartItem = (itemId: string): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  try {
    await requestDeleteShoppingCartItem(itemId);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkChangeItemChecked = (item: CartItem): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  const changedItem = { ...item, checked: !item.checked };

  try {
    await requestChangeShoppingCartItemChecked(changedItem);
    dispatch({ type: CHANGE_CART_ITEM_CHECKED_SUCCESS, payload: changedItem });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkChangeAllItemChecked = (items: CartItem[], checked: boolean): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOADING });

  try {
    await requestChangeAllShoppingCartItemChecked(items, checked);
    dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, payload: checked });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkDeleteCheckedCartItem = (items: CartItem[]): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOADING });

  try {
    const checkedItems = items.filter((item) => item.checked);

    await requestDeleteShoppingCartItems(checkedItems);
    dispatch({ type: DELETE_CHECKED_CART_ITEM_SUCCESS });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkClearCart = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  try {
    await requestClearShoppingCartItems();
    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export type CartAction =
  | Action<typeof LOADING>
  | ActionWithPayload<typeof ERROR, Error>
  | ActionWithPayload<typeof ADD_ITEM, Product>
  | ActionWithPayload<typeof GET_CART_ITEMS_SUCCESS, CartItem[]>
  | ActionWithPayload<typeof ADD_CART_ITEM_SUCCESS, CartItem>
  | ActionWithPayload<typeof DELETE_CART_ITEM_SUCCESS, string>
  | Action<typeof DELETE_CHECKED_CART_ITEM_SUCCESS>
  | ActionWithPayload<typeof CHANGE_CART_ITEM_CHECKED_SUCCESS, CartItem>
  | ActionWithPayload<typeof CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, boolean>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY_SUCCESS, CartItem>
  | Action<typeof CLEAR_CART_SUCCESS>;
