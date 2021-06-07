import { Dispatch } from 'redux';
import { Action, ActionWithPayload, AppThunk } from '.';
import {
  clearCartItemAdditionalDataInLocalStorage,
  deleteCartItemAdditionalDataInLocalStorage,
  getCartItemAdditionalDataInLocalStorage,
  setCartItemAdditionalDataInLocalStorage,
} from '../../service/localStorage/cart';
import {
  requestShoppingCartItemToAdd,
  requestShoppingCartItemsToClear,
  requestShoppingCartItemToDelete,
  requestShoppingCartItemsToDelete,
  requestShoppingCartItemList,
} from '../../service/request/cart';
import { CartItem, Product } from '../../types';

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

export const DELETE_CART_ITEMS = 'cart/DELETE_ITEMS';
export const DELETE_CART_ITEMS_SUCCESS = 'cart/DELETE_ITEMS_SUCCESS';
export const DELETE_CART_ITEMS_ERROR = 'cart/DELETE_ITEMS_ERROR';

export const TOGGLE_CART_ITEM_CHECKED = 'cart/TOGGLE_ITEM_CHECKED';
export const TOGGLE_CART_ITEM_CHECKED_SUCCESS = 'cart/TOGGLE_ITEM_CHECKED_SUCCESS';
export const TOGGLE_CART_ITEM_CHECKED_ERROR = 'cart/TOGGLE_ITEM_CHECKED_ERROR';

export const CHANGE_ALL_CART_ITEM_CHECKED = 'cart/CHANGE_ALL_ITEM_CHECKED';
export const CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS = 'cart/CHANGE_ALL_ITEM_CHECKED_SUCCESS';
export const CHANGE_ALL_CART_ITEM_CHECKED_ERROR = 'cart/CHANGE_ALL_ITEM_CHECKED_ERROR';

export const CLEAR_CART = 'cart/CLEAR_CART';
export const CLEAR_CART_SUCCESS = 'cart/CLEAR_CART_SUCCESS';
export const CLEAR_CART_ERROR = 'cart/CLEAR_CART_ERROR';

export const thunkGetCartItems = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CART_ITEMS });

  try {
    const incompleteCartItemList = await requestShoppingCartItemList();

    const completeCartItemList = incompleteCartItemList.map((cartItem) => {
      const { quantity, checked } = getCartItemAdditionalDataInLocalStorage(cartItem.id);

      return {
        ...cartItem,
        quantity,
        checked,
      };
    });

    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: completeCartItemList });
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_ERROR, payload: error });
  }
};

export const thunkAddNewItemToCart = (product: Product): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_CART_ITEM });

  try {
    const cartId = await requestShoppingCartItemToAdd(product.id);
    const newCartItem: CartItem = {
      ...product,
      id: cartId,
      checked: true,
      quantity: 1,
    };

    setCartItemAdditionalDataInLocalStorage({
      id: newCartItem.id,
      quantity: newCartItem.quantity,
      checked: newCartItem.checked,
    });

    dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: newCartItem });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_ERROR, payload: error });
  }
};

export const thunkChangeItemQuantity = (item: CartItem, quantity: number): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CHANGE_ITEM_QUANTITY });

  const changedItem = { ...item, quantity };

  try {
    const { id, quantity, checked } = changedItem;

    setCartItemAdditionalDataInLocalStorage({
      id,
      quantity,
      checked,
    });

    dispatch({ type: CHANGE_ITEM_QUANTITY_SUCCESS, payload: changedItem });
  } catch (error) {
    dispatch({ type: CHANGE_ITEM_QUANTITY_ERROR, payload: error });
  }
};

export const thunkToggleItemChecked = (item: CartItem): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_CART_ITEM_CHECKED });

  const toggledItem = { ...item, checked: !item.checked };

  try {
    const { id, quantity, checked } = toggledItem;

    setCartItemAdditionalDataInLocalStorage({
      id,
      quantity,
      checked,
    });

    dispatch({ type: TOGGLE_CART_ITEM_CHECKED_SUCCESS, payload: toggledItem });
  } catch (error) {
    dispatch({ type: TOGGLE_CART_ITEM_CHECKED_ERROR, payload: error });
  }
};

export const thunkChangeAllItemChecked = (items: CartItem[], checked: boolean): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED });

  try {
    items.forEach((item) => {
      const { id, quantity } = item;
      setCartItemAdditionalDataInLocalStorage({
        id,
        quantity,
        checked,
      });
    });

    dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, payload: checked });
  } catch (error) {
    dispatch({ type: CHANGE_ALL_CART_ITEM_CHECKED_ERROR, payload: error });
  }
};

export const thunkDeleteCartItem = (itemId: string): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_CART_ITEM });

  try {
    await requestShoppingCartItemToDelete(itemId);
    deleteCartItemAdditionalDataInLocalStorage(itemId);

    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({ type: DELETE_CART_ITEM_ERROR, payload: error });
  }
};

export const thunkDeleteCartItems = (items: CartItem[]): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_CART_ITEMS });

  try {
    await requestShoppingCartItemsToDelete(items);
    items.forEach((item) => {
      deleteCartItemAdditionalDataInLocalStorage(item.id);
    });

    dispatch({ type: DELETE_CART_ITEMS_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_CART_ITEMS_ERROR, payload: error });
  }
};

export const thunkClearCart = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_CART });

  try {
    clearCartItemAdditionalDataInLocalStorage();
    await requestShoppingCartItemsToClear();

    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: CLEAR_CART_ERROR, payload: error });
  }
};

export type CartAction =
  | Action<typeof GET_CART_ITEMS>
  | ActionWithPayload<typeof GET_CART_ITEMS_SUCCESS, CartItem[]>
  | ActionWithPayload<typeof GET_CART_ITEMS_ERROR, Error>
  | Action<typeof ADD_CART_ITEM>
  | ActionWithPayload<typeof ADD_CART_ITEM_SUCCESS, CartItem>
  | ActionWithPayload<typeof ADD_CART_ITEM_ERROR, Error>
  | Action<typeof DELETE_CART_ITEM>
  | ActionWithPayload<typeof DELETE_CART_ITEM_SUCCESS, string>
  | ActionWithPayload<typeof DELETE_CART_ITEM_ERROR, Error>
  | Action<typeof DELETE_CART_ITEMS>
  | Action<typeof DELETE_CART_ITEMS_SUCCESS>
  | ActionWithPayload<typeof DELETE_CART_ITEMS_ERROR, Error>
  | Action<typeof TOGGLE_CART_ITEM_CHECKED>
  | ActionWithPayload<typeof TOGGLE_CART_ITEM_CHECKED_SUCCESS, CartItem>
  | ActionWithPayload<typeof TOGGLE_CART_ITEM_CHECKED_ERROR, Error>
  | Action<typeof CHANGE_ALL_CART_ITEM_CHECKED>
  | ActionWithPayload<typeof CHANGE_ALL_CART_ITEM_CHECKED_SUCCESS, boolean>
  | ActionWithPayload<typeof CHANGE_ALL_CART_ITEM_CHECKED_ERROR, Error>
  | Action<typeof CHANGE_ITEM_QUANTITY>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY_SUCCESS, CartItem>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY_ERROR, Error>
  | Action<typeof CLEAR_CART>
  | Action<typeof CLEAR_CART_SUCCESS>
  | ActionWithPayload<typeof CLEAR_CART_ERROR, Error>;
