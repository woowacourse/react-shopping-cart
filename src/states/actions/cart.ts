import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionWithPayload, AppThunk } from '.';
import { requestAddShoppingCartItem, requestShoppingCartItemList } from '../../service/request';
import { ItemInCart, Product } from '../../types';
import { createItemInCart } from '../../utils/cart';

export const ADD_ITEM = 'cart/ADD_ITEM';

export const GET_CART_ITEMS = 'cart/GET_CART_ITEMS';
export const GET_CART_ITEMS_SUCCESS = 'cart/GET_CART_ITEMS_SUCCESS';
export const GET_CART_ITEMS_ERROR = 'cart/GET_CART_ITEMS_ERROR';

export const ADD_CART_ITEM = 'cart/ADD_CART_ITEM';
export const ADD_CART_ITEM_SUCCESS = 'cart/ADD_CART_ITEM_SUCCESS';
export const ADD_CART_ITEM_ERROR = 'cart/ADD_CART_ITEM_ERROR';

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

export type CartAction =
  | ActionWithPayload<typeof ADD_ITEM, Product>
  | Action<typeof GET_CART_ITEMS>
  | ActionWithPayload<typeof GET_CART_ITEMS_SUCCESS, ItemInCart[]>
  | ActionWithPayload<typeof GET_CART_ITEMS_ERROR, Error>
  | Action<typeof ADD_CART_ITEM>
  | ActionWithPayload<typeof ADD_CART_ITEM_SUCCESS, ItemInCart>
  | ActionWithPayload<typeof ADD_CART_ITEM_ERROR, Error>;
