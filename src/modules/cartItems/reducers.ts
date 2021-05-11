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
  AddCartItemAction,
  GetCartItemsAction,
  UpdateQuantityAction,
} from './actions';
import * as T from '../../types';

export type CartState = {
  cartItems: {
    data: T.CartItem[];
    success: boolean;
    error: Error | null;
  };
};

const initialState: CartState = {
  cartItems: {
    data: [],
    success: false,
    error: null,
  },
};

export const cartReducer = (
  state: CartState = initialState,
  action: AddCartItemAction | GetCartItemsAction | UpdateQuantityAction
) => {
  switch (action.type) {
    case ADD_CART_ITEM_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = null;
      });

    case ADD_CART_ITEM_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = true;
        draft.cartItems.error = null;
      });

    case ADD_CART_ITEM_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = action.error;
      });

    case GET_CART_ITEMS_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = null;
      });

    case GET_CART_ITEMS_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.data = action.cartItems;
        draft.cartItems.success = true;
        draft.cartItems.error = null;
      });

    case GET_CART_ITEMS_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = action.error;
      });

    case UPDATE_QUANTITY_REQUEST:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = null;
      });

    case UPDATE_QUANTITY_SUCCESS:
      return produce(state, (draft: Draft<CartState>) => {
        const target = draft.cartItems.data.find((item) => item.id === action.payload.id);
        if (target) target.quantity = action.payload.quantity;
      });

    case UPDATE_QUANTITY_FAILURE:
      return produce(state, (draft: Draft<CartState>) => {
        draft.cartItems.success = false;
        draft.cartItems.error = null;
      });

    default:
      return {
        ...state,
      };
  }
};
