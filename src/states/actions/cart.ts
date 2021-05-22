import { Dispatch } from 'redux';
import { Action, ActionWithPayload, AppThunk } from '.';
import { NETWORK_ERROR } from '../../constants/error';
import {
  requestAddCartItem,
  requestClearShoppingCartItems,
  requestDeleteCartItem,
  requestCartItemList,
  requestDeleteCartItems,
} from '../../service/request/cart';
import { CartId, CartItem, CartItemOnServer, Product } from '../../types';

export const LOADING = 'cart/LOADING';
export const ERROR = 'cart/ERROR';

export const ADD_ITEM = 'cart/ADD_ITEM';

export const GET_CART_ITEMS_SUCCESS = 'cart/GET_CART_ITEMS_SUCCESS';
export const ADD_CART_ITEM_SUCCESS = 'cart/ADD_CART_ITEM_SUCCESS';
export const CHANGE_ITEM_QUANTITY = 'cart/CHANGE_ITEM_QUANTITY';
export const DELETE_CART_ITEM_SUCCESS = 'cart/DELETE_ITEM_SUCCESS';
export const CHANGE_ITEM_CHECKED = 'cart/CHANGE_ITEM_CHECKED';
export const CHANGE_ALL_ITEM_CHECKED = 'cart/CHANGE_ALL_ITEM_CHECKED';
export const DELETE_CHECKED_ITEMS_SUCCESS = 'cart/DELETE_CHECKED_ITEM';
export const CLEAR_CART_SUCCESS = 'cart/CLEAR_CART_SUCCESS';

export const addItem = (item: Product): ActionWithPayload<typeof ADD_ITEM, Product> => ({
  type: ADD_ITEM,
  payload: item,
});

export const thunkGetCartItems = (userName: string): AppThunk => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  try {
    const items = await requestCartItemList(userName);

    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

const getCartId = (response: Response) => {
  const location = response.headers.get('Location');
  const splittedLocation = location?.split('/');

  if (!splittedLocation) throw new Error(NETWORK_ERROR);

  const cartId = Number(splittedLocation[splittedLocation.length - 1]);

  if (isNaN(cartId)) throw new Error(NETWORK_ERROR);

  return cartId;
};

export const thunkDeleteCartItem = (userName: string, cartId: CartId): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOADING });

  try {
    await requestDeleteCartItem(userName, cartId);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: cartId });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkDeleteCheckedItems = (userName: string, items: CartItem[]): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOADING });
  try {
    const checkedItemIds = items.filter((item) => item.checked).map((item) => item.cart_id);
    await requestDeleteCartItems(userName, checkedItemIds);
    dispatch({ type: DELETE_CHECKED_ITEMS_SUCCESS });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const thunkAddItemToCart = (userName: string, product: Product): AppThunk => async (
  dispatch: Dispatch
) => {
  const { product_id, image_url, name, price } = product;

  dispatch({ type: LOADING });
  try {
    const result = await requestAddCartItem(userName, product_id);
    const cart_id = getCartId(result);
    const cartItem: CartItem = { cart_id, image_url, name, price, quantity: 1, checked: true };

    dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: cartItem });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const changeCartItemQuantity = (
  item: CartItem,
  quantity: number
): ActionWithPayload<typeof CHANGE_ITEM_QUANTITY, CartItem> => ({
  type: CHANGE_ITEM_QUANTITY,
  payload: { ...item, quantity },
});

export const changeItemChecked = (
  cartId: CartId
): ActionWithPayload<typeof CHANGE_ITEM_CHECKED, CartId> => ({
  type: CHANGE_ITEM_CHECKED,
  payload: cartId,
});

export const changeAllItemChecked = (
  checked: boolean
): ActionWithPayload<typeof CHANGE_ALL_ITEM_CHECKED, boolean> => ({
  type: CHANGE_ALL_ITEM_CHECKED,
  payload: checked,
});

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
  | ActionWithPayload<typeof GET_CART_ITEMS_SUCCESS, CartItemOnServer[]>
  | ActionWithPayload<typeof ADD_CART_ITEM_SUCCESS, CartItem>
  | ActionWithPayload<typeof DELETE_CART_ITEM_SUCCESS, CartId>
  | Action<typeof DELETE_CHECKED_ITEMS_SUCCESS>
  | ActionWithPayload<typeof CHANGE_ITEM_CHECKED, CartId>
  | ActionWithPayload<typeof CHANGE_ALL_ITEM_CHECKED, boolean>
  | ActionWithPayload<typeof CHANGE_ITEM_QUANTITY, CartItem>
  | Action<typeof CLEAR_CART_SUCCESS>;
