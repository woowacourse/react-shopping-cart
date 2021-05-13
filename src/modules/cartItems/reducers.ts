import produce, { Draft } from 'immer';
import {
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILURE,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
  UPDATE_QUANTITY_REQUEST,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_FAILURE,
  CHECK_CART_ITEM,
  CHECK_ALL_CART_ITEMS,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_CHECKED_ITEMS_REQUEST,
  DELETE_CHECKED_ITEMS_SUCCESS,
  DELETE_CHECKED_ITEMS_FAILURE,
  AddCartItemAction,
  GetCartItemsAction,
  UpdateQuantityAction,
  CheckCartItemAction,
  CheckAllCartItemsAction,
  DeleteItemAction,
  DeleteCheckedItemsAction,
} from './actions';
import * as T from '../../types';

export type CartState = {
  cartItems: {
    data: T.CartItem[];
    status: T.AsyncStatus;
    error: Error | null;
  };
};

const initialState: CartState = {
  cartItems: {
    data: [],
    status: T.AsyncStatus.IDLE,
    error: null,
  },
};

export const cartReducer = (
  state: CartState = initialState,
  action:
    | AddCartItemAction
    | GetCartItemsAction
    | UpdateQuantityAction
    | CheckCartItemAction
    | CheckAllCartItemsAction
    | DeleteItemAction
    | DeleteCheckedItemsAction
) => {
  switch (action.type) {
    case ADD_CART_ITEM_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
        draft.cartItems.error = null;
      });

    case ADD_CART_ITEM_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
        draft.cartItems.error = null;
        draft.cartItems.data.push(action.cartItem);
      });

    case ADD_CART_ITEM_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
        draft.cartItems.error = action.error;
      });

    case GET_CART_ITEMS_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
        draft.cartItems.error = null;
      });

    case GET_CART_ITEMS_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        const newCartItems = action.cartItems.map((item) => ({ ...item, checked: true }));
        draft.cartItems.data = newCartItems;
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
        draft.cartItems.error = null;
      });

    case GET_CART_ITEMS_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
        draft.cartItems.error = action.error;
      });

    case UPDATE_QUANTITY_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
        draft.cartItems.error = null;
      });

    case UPDATE_QUANTITY_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        const target = draft.cartItems.data.find((item) => item.id === action.payload.id);
        if (target) target.quantity = action.payload.quantity;
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
      });

    case UPDATE_QUANTITY_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
        draft.cartItems.error = action.error;
      });

    case CHECK_CART_ITEM:
      return produce(state, (draft: Draft<CartState>) => {
        const target = draft.cartItems.data.find((item) => item.id === action.payload.id);
        if (target) target.checked = action.payload.checked;
        draft.cartItems.status = T.AsyncStatus.IDLE;
      });

    case CHECK_ALL_CART_ITEMS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = [...draft.cartItems.data].map((item) => ({ ...item, checked: action.checked }));
        draft.cartItems.status = T.AsyncStatus.IDLE;
      });

    case DELETE_ITEM_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
        draft.cartItems.error = null;
      });

    case DELETE_ITEM_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = draft.cartItems.data.filter((item) => item.id !== action.id);
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
        draft.cartItems.error = null;
      });

    case DELETE_ITEM_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
        draft.cartItems.error = action.error;
      });

    case DELETE_CHECKED_ITEMS_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
        draft.cartItems.error = null;
      });

    case DELETE_CHECKED_ITEMS_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = draft.cartItems.data.filter((item) => !action.ids.includes(item.id));
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
        draft.cartItems.error = null;
      });

    case DELETE_CHECKED_ITEMS_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
        draft.cartItems.error = action.error;
      });

    default:
      return {
        ...state,
      };
  }
};
