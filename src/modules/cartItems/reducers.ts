import produce, { Draft } from 'immer';
import {
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILURE,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
  UPDATE_QUANTITY,
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
  };
};

const initialState: CartState = {
  cartItems: {
    data: [],
    status: T.AsyncStatus.IDLE,
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
    case GET_CART_ITEMS_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
      });

    case GET_CART_ITEMS_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        const newCartItems = action.cartItems.map((item) => ({ ...item, quantity: 1, checked: true }));
        draft.cartItems.data = newCartItems;
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
      });

    case GET_CART_ITEMS_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
      });

    case ADD_CART_ITEM_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
      });

    case ADD_CART_ITEM_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
        draft.cartItems.data.push({
          cartId: action.payload.cartId,
          quantity: 1,
          checked: true,
          ...action.payload.product,
        });
      });

    case ADD_CART_ITEM_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
      });
    case UPDATE_QUANTITY:
      return produce(state, (draft: Draft<CartState>) => {
        const target = draft.cartItems.data.find((item) => item.cartId === action.payload.id);
        if (target) target.quantity = action.payload.quantity;
      });

    case CHECK_CART_ITEM:
      return produce(state, (draft: Draft<CartState>) => {
        const target = draft.cartItems.data.find((item) => item.cartId === action.payload.id);
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
      });

    case DELETE_ITEM_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = draft.cartItems.data.filter((item) => item.cartId !== action.id);
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
      });

    case DELETE_ITEM_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
      });

    case DELETE_CHECKED_ITEMS_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.PENDING;
      });

    case DELETE_CHECKED_ITEMS_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = draft.cartItems.data.filter((item) => !action.ids.includes(item.cartId));
        draft.cartItems.status = T.AsyncStatus.SUCCESS;
      });

    case DELETE_CHECKED_ITEMS_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.status = T.AsyncStatus.FAILURE;
      });

    default:
      return {
        ...state,
      };
  }
};
