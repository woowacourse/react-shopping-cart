import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import api from '../../api';
import * as T from '../../types';
import API from '../../constants/api';
import { toCamelCaseKeyObjectArray } from '../../utils';

export const ADD_CART_ITEM_REQUEST = 'cartItems/ADD_CART_ITEM_REQUEST' as const;
export const ADD_CART_ITEM_SUCCESS = 'cartItems/ADD_CART_ITEM_SUCCESS' as const;
export const ADD_CART_ITEM_FAILURE = 'cartItems/ADD_CART_ITEM_FAILURE' as const;

export const GET_CART_ITEMS_REQUEST = 'cartItems/GET_CART_ITEMS_REQUEST' as const;
export const GET_CART_ITEMS_SUCCESS = 'cartItems/GET_CART_ITEMS_SUCCESS' as const;
export const GET_CART_ITEMS_FAILURE = 'cartItems/GET_CART_ITEMS_FAILURE' as const;

export const UPDATE_QUANTITY = 'cartItems/UPDATE_QUANTITY' as const;

export const CHECK_CART_ITEM = 'cartItems/CHECK_CART_ITEM' as const;
export const CHECK_ALL_CART_ITEMS = 'cartItems/CHECK_ALL_CART_ITEMS' as const;

export const DELETE_ITEM_REQUEST = 'cartItems/DELETE_ITEM_REQUEST' as const;
export const DELETE_ITEM_SUCCESS = 'cartItems/DELETE_ITEM_SUCCESS' as const;
export const DELETE_ITEM_FAILURE = 'cartItems/DELETE_ITEM_FAILURE' as const;

export const DELETE_CHECKED_ITEMS_REQUEST = 'cartItems/DELETE_CHECKED_ITEMS_REQUEST' as const;
export const DELETE_CHECKED_ITEMS_SUCCESS = 'cartItems/DELETE_CHECKED_ITEMS_SUCCESS' as const;
export const DELETE_CHECKED_ITEMS_FAILURE = 'cartItems/DELETE_CHECKED_ITEMS_FAILURE' as const;

export const RESET_CART_ITEMS_STATE = 'cartItems/RESET_CART_ITEMS_STATE' as const;

interface AddCartItemRequestAction {
  type: typeof ADD_CART_ITEM_REQUEST;
  productId: T.Product['productId'];
}

interface AddCartItemSuccessAction {
  type: typeof ADD_CART_ITEM_SUCCESS;
  cartItem: T.CartItem;
}

interface AddCartItemFailureAction {
  type: typeof ADD_CART_ITEM_FAILURE;
  error: AxiosError;
}

interface GetCartItemRequestAction {
  type: typeof GET_CART_ITEMS_REQUEST;
}

interface GetCartItemSuccessAction {
  type: typeof GET_CART_ITEMS_SUCCESS;
  cartItems: T.CartItem[];
}

interface GetCartItemFailureAction {
  type: typeof GET_CART_ITEMS_FAILURE;
  error: AxiosError;
}

export type UpdateQuantityAction = {
  type: typeof UPDATE_QUANTITY;
  payload: {
    id: T.CartItem['cartId'];
    quantity: T.CartItem['quantity'];
  };
};

interface DeleteItemRequestAction {
  type: typeof DELETE_ITEM_REQUEST;
}

interface DeleteItemSuccessAction {
  type: typeof DELETE_ITEM_SUCCESS;
  id: T.CartItem['cartId'];
}

interface DeleteItemFailureAction {
  type: typeof DELETE_ITEM_FAILURE;
  error: AxiosError;
}

interface DeleteCheckedItemsRequestAction {
  type: typeof DELETE_CHECKED_ITEMS_REQUEST;
}

interface DeleteCheckedItemsSuccessAction {
  type: typeof DELETE_CHECKED_ITEMS_SUCCESS;
  ids: T.CartItem['cartId'][];
}

interface DeleteCheckedItemsFailureAction {
  type: typeof DELETE_CHECKED_ITEMS_FAILURE;
  error: AxiosError;
}

export type CheckCartItemAction = {
  type: typeof CHECK_CART_ITEM;
  payload: {
    id: T.CartItem['cartId'];
    checked: T.CartItem['checked'];
  };
};

export type CheckAllCartItemsAction = {
  type: typeof CHECK_ALL_CART_ITEMS;
  checked: boolean;
};

export type AddCartItemAction = AddCartItemRequestAction | AddCartItemSuccessAction | AddCartItemFailureAction;
export type GetCartItemsAction = GetCartItemRequestAction | GetCartItemSuccessAction | GetCartItemFailureAction;
export type DeleteItemAction = DeleteItemRequestAction | DeleteItemSuccessAction | DeleteItemFailureAction;
export type DeleteCheckedItemsAction =
  | DeleteCheckedItemsRequestAction
  | DeleteCheckedItemsSuccessAction
  | DeleteCheckedItemsFailureAction;

export const getCartItemsRequest = () => async (dispatch: Dispatch<GetCartItemsAction>) => {
  dispatch({ type: GET_CART_ITEMS_REQUEST });

  try {
    const response = await api.get(API.CARTS);
    const cartItems = toCamelCaseKeyObjectArray(response.data);
    const cartItemsWithQuantity = cartItems.map((item: T.CartItem) => ({ ...item, quantity: 1 }));

    dispatch({ type: GET_CART_ITEMS_SUCCESS, cartItems: cartItemsWithQuantity });
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_FAILURE, error });
  }
};

export const addCartItemRequest = (productId: T.Product['productId']) => async (
  dispatch: Dispatch<AddCartItemAction>
) => {
  dispatch({ type: ADD_CART_ITEM_REQUEST, productId });

  try {
    const response = await api.post(API.CARTS, {
      product_id: productId,
    });

    dispatch({ type: ADD_CART_ITEM_SUCCESS, cartItem: response.data });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_FAILURE, error });
    throw error;
  }
};

export const updateQuantity = (id: number, quantity: number) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

export const checkCartItem = (id: T.CartItem['cartId'], checked: T.CartItem['checked']) => ({
  type: CHECK_CART_ITEM,
  payload: { id, checked },
});

export const checkAllCartItems = (checked: boolean) => ({
  type: CHECK_ALL_CART_ITEMS,
  checked,
});

export const deleteItemActionRequest = (id: T.CartItem['cartId']) => async (dispatch: Dispatch<DeleteItemAction>) => {
  dispatch({ type: DELETE_ITEM_REQUEST });

  try {
    await api.delete(`${API.CARTS}/${id}`);

    dispatch({ type: DELETE_ITEM_SUCCESS, id });
  } catch (error) {
    dispatch({ type: DELETE_ITEM_FAILURE, error });
  }
};

export const deleteCheckedItemsActionRequest = (ids: T.CartItem['cartId'][]) => async (
  dispatch: Dispatch<DeleteCheckedItemsAction>
) => {
  dispatch({ type: DELETE_CHECKED_ITEMS_REQUEST });

  try {
    await Promise.all(ids.map((id) => api.delete(`${API.CARTS}/${id}`)));

    dispatch({ type: DELETE_CHECKED_ITEMS_SUCCESS, ids });
  } catch (error) {
    dispatch({ type: DELETE_CHECKED_ITEMS_FAILURE, error });
  }
};
