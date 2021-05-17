import { API_PATH } from '../../constants/api';
import { requestDeleteItem, requestGetItemList, requestInsertItem } from '../../request/request';
import { createAsyncThunk } from '../utils/async';

export const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
export const INSERT_SHOPPING_CART_ITEM_SUCCESS = 'shoppingCart/INSERT_SHOPPING_CART_ITEM_SUCCESS';
export const INSERT_SHOPPING_CART_ITEM_FAILURE = 'shoppingCart/INSERT_SHOPPING_CART_ITEM_FAILURE';

export const DELETE_SHOPPING_CART_ITEM = 'shoppingCart/DELETE_SHOPPING_CART_ITEM';
export const DELETE_SHOPPING_CART_ITEM_SUCCESS = 'shoppingCart/DELETE_SHOPPING_CART_ITEM_SUCCESS';
export const DELETE_SHOPPING_CART_ITEM_FAILURE = 'shoppingCart/DELETE_SHOPPING_CART_ITEM_FAILURE';

export const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST';
export const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS =
  'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS';
export const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE =
  'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE';

export const GET_SHOPPING_CART_ITEM_LIST = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST';
export const GET_SHOPPING_CART_ITEM_LIST_SUCCESS = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST_SUCCESS';
export const GET_SHOPPING_CART_ITEM_LIST_FAILURE = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST_FAILURE';

export const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
export const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';
export const INCREASE_COUNT = 'shoppingCart/INCREASE_COUNT';
export const DECREASE_COUNT = 'shoppingCart/DECREASE_COUNT';

export const insertShoppingCartItem = createAsyncThunk(INSERT_SHOPPING_CART_ITEM, (data) =>
  requestInsertItem(API_PATH.SHOPPING_CART_LIST, { product_id: data.product_id })
);

export const deleteShoppingCartItem = createAsyncThunk(DELETE_SHOPPING_CART_ITEM, (id) =>
  requestDeleteItem(API_PATH.SHOPPING_CART_LIST, id)
);

export const getShoppingCartItemList = createAsyncThunk(GET_SHOPPING_CART_ITEM_LIST, () =>
  requestGetItemList(API_PATH.SHOPPING_CART_LIST)
);

const requestDeleteCheckedItemList = (checkedItemList) =>
  Promise.all(checkedItemList.map(({ id }) => requestDeleteItem(API_PATH.SHOPPING_CART_LIST, id)));

export const deleteCheckedShoppingCartList = createAsyncThunk(
  DELETE_CHECKED_SHOPPING_CART_ITEM_LIST,
  requestDeleteCheckedItemList
);

export const toggleShoppingCartItem = (shoppingCartItemId) => ({
  type: TOGGLE_SHOPPING_CART_ITEM,
  payload: shoppingCartItemId,
});

export const toggleAllShoppingCartItem = () => ({
  type: TOGGLE_ALL_SHOPPING_CART_ITEM,
});

export const increaseCount = (shoppingCartItemId) => ({
  type: INCREASE_COUNT,
  payload: shoppingCartItemId,
});

export const decreaseCount = (shoppingCartItemId) => ({
  type: DECREASE_COUNT,
  payload: shoppingCartItemId,
});
