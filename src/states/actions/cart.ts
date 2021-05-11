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
import { ItemInCart, Product } from '../../types';
import { createItemInCart } from '../../utils/cart';

export const ADD_ITEM = 'cart/ADD_ITEM';

export const GET_CART_ITEMS = 'cart/GET_CART_ITEMS';
export const GET_CART_ITEMS_SUCCESS = 'cart/GET_CART_ITEMS_SUCCESS';
export const GET_CART_ITEMS_ERROR = 'cart/GET_CART_ITEMS_ERROR';

export const ADD_CART_ITEM = 'cart/ADD_CART_ITEM';
export const ADD_CART_ITEM_SUCCESS = 'cart/ADD_CART_ITEM_SUCCESS';
export const ADD_CART_ITEM_ERROR = 'cart/ADD_CART_ITEM_ERROR';

export const CHANGE_ITEM_QUANTITY = 'cart/CHANGE_ITEM_QUANTITY';
export const CHANGE_ITEM_QUANTITY_SUCCESS = 'cart/CHANGE_ITEM_QUANTITY_SUCCESS';
export const CHANGE_ITEM_QUANTITY_ERROR = 'cart/CHANGE_ITEM_QUANTITY_ERROR';

export const DELETE_CART_ITEM = 'cart/DELETE_ITEM';
export const DELETE_CART_ITEM_SUCCESS = 'cart/DELETE_ITEM_SUCCESS';
export const DELETE_CART_ITEM_ERROR = 'cart/DELETE_ITEM_ERROR';

export const CHANGE_CART_ITEM_CHECKED = 'cart/CHANGE_ITEM_CHECKED';
export const CHANGE_CART_ITEM_CHECKED_SUCCESS = 'cart/CHANGE_ITEM_CHECKED_SUCCESS';
export const CHANGE_CART_ITEM_CHECKED_ERROR = 'cart/CHANGE_ITEM_CHECKED_ERROR';

export const CHANGE_ALL_CART_ITEM_CHECKED = 'cart/CHANGE_ALL_ITEM_CHECKED';
export const CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS = 'cart/CHANGE_ALL_ITEM_CHECKED_SUCCESS';
export const CHANGE_ALL_CART_ITEM_CHECKED_ERROR = 'cart/CHANGE_ALL_ITEM_CHECKED_ERROR';

export const DELETE_CHECKED_CART_ITEM = 'cart/DELETE_CHECKED_ITEM';
export const DELETE_CHECKED_CART_ITEM_SUCCESS = 'cart/DELETE_CHECKED_ITEM_SUCCESS';
export const DELETE_CHECKED_CART_ITEM_ERROR = 'cart/DELETE_CHECKED_ITEM_ERROR';

export const CLEAR_CART = 'cart/CLEAR_CART';
export const CLEAR_CART_SUCCESS = 'cart/CLEAR_CART_SUCCESS';
export const CLEAR_CART_ERROR = 'cart/CLEAR_CART_ERROR';

export const addItem = (item: Product): ActionWithPayload<typeof ADD_ITEM, Product> => ({
  type: ADD_ITEM,
  payload: item,
});

export const thunkGetCartItems = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CART_ITEMS });

  try {
    const items = await requestShoppingCartItemList();
    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_ERROR, payload: error });
  }
};

export const thunkAddItemToCart = (item: Product): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_CART_ITEM });

  try {
    const newCartItem = createItemInCart(item);

    await requestAddShoppingCartItem(newCartItem);
    dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: newCartItem });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_ERROR, payload: error });
  }
};

export const thunkChangeItemQuantity = (item: ItemInCart, quantity: number): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CHANGE_ITEM_QUANTITY });

  const changedItem = { ...item, quantity };

  try {
    await requestChangeShoppingCartItem(changedItem);
    dispatch({ type: CHANGE_ITEM_QUANTITY_SUCCESS, payload: changedItem });
  } catch (error) {
    dispatch({ type: CHANGE_ITEM_QUANTITY_ERROR, payload: error });
  }
};

export const thunkDeleteCartItem = (itemId: string): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_CART_ITEM });

  try {
    await requestDeleteShoppingCartItem(itemId);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({ type: DELETE_CART_ITEM_ERROR, payload: error });
  }
};

export const thunkChangeItemChecked = (item: ItemInCart): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CHANGE_CART_ITEM_CHECKED });

  const changedItem = { ...item, checked: !item.checked };

  try {
    await requestChangeShoppingCartItemChecked(changedItem);
    dispatch({ type: CHANGE_CART_ITEM_CHECKED_SUCCESS, payload: changedItem });
  } catch (error) {
    dispatch({ type: CHANGE_CART_ITEM_CHECKED_ERROR, payload: error });
  }
};

export const thunkChangeAllItemChecked = (
  items: ItemInCart[],
  checked: boolean
): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED });

  try {
    await requestChangeAllShoppingCartItemChecked(items, checked);
    dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, payload: checked });
  } catch (error) {
    dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED_ERROR, payload: error });
  }
};

export const thunkDeleteCheckedCartItem = (items: ItemInCart[]): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: DELETE_CHECKED_CART_ITEM });

  try {
    const checkedItems = items.filter((item) => item.checked);

    await requestDeleteShoppingCartItems(checkedItems);
    dispatch({ type: DELETE_CHECKED_CART_ITEM_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_CHECKED_CART_ITEM_ERROR, payload: error });
  }
};

export const thunkClearCart = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_CART });

  try {
    await requestClearShoppingCartItems();
    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: CLEAR_CART_ERROR, payload: error });
  }
};

export type CartAction =
  | ActionWithPayload<typeof ADD_ITEM, Product>
  | Action<typeof GET_CART_ITEMS>
  | ActionWithPayload<typeof GET_CART_ITEMS_SUCCESS, ItemInCart[]>
  | ActionWithPayload<typeof GET_CART_ITEMS_ERROR, Error>
  | Action<typeof ADD_CART_ITEM>
  | ActionWithPayload<typeof ADD_CART_ITEM_SUCCESS, ItemInCart>
  | ActionWithPayload<typeof ADD_CART_ITEM_ERROR, Error>
  | Action<typeof DELETE_CART_ITEM>
  | ActionWithPayload<typeof DELETE_CART_ITEM_SUCCESS, string>
  | ActionWithPayload<typeof DELETE_CART_ITEM_ERROR, Error>
  | Action<typeof DELETE_CHECKED_CART_ITEM>
  | Action<typeof DELETE_CHECKED_CART_ITEM_SUCCESS>
  | ActionWithPayload<typeof DELETE_CHECKED_CART_ITEM_ERROR, Error>
  | Action<typeof CHANGE_CART_ITEM_CHECKED>
  | ActionWithPayload<typeof CHANGE_CART_ITEM_CHECKED_SUCCESS, ItemInCart>
  | ActionWithPayload<typeof CHANGE_CART_ITEM_CHECKED_ERROR, Error>
  | Action<typeof CHANGE_ALL_CART_ITEM_CHECKED>
  | ActionWithPayload<typeof CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, boolean>
  | ActionWithPayload<typeof CHANGE_ALL_CART_ITEM_CHECKED_ERROR, Error>
  | Action<typeof CHANGE_ITEM_QUANTITY>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY_SUCCESS, ItemInCart>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY_ERROR, Error>
  | Action<typeof CLEAR_CART>
  | Action<typeof CLEAR_CART_SUCCESS>
  | ActionWithPayload<typeof CLEAR_CART_ERROR, Error>;
