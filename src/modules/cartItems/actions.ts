import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import api from 'api';
import { CartItem, Product } from 'types';

export const ADD_CART_ITEM_REQUEST = 'cartItems/ADD_CART_ITEM_REQUEST' as const;
export const ADD_CART_ITEM_SUCCESS = 'cartItems/ADD_CART_ITEM_SUCCESS' as const;
export const ADD_CART_ITEM_FAILURE = 'cartItems/ADD_CART_ITEM_FAILURE' as const;

export const GET_CART_ITEMS_REQUEST = 'cartItems/GET_CART_ITEMS_REQUEST' as const;
export const GET_CART_ITEMS_SUCCESS = 'cartItems/GET_CART_ITEMS_SUCCESS' as const;
export const GET_CART_ITEMS_FAILURE = 'cartItems/GET_CART_ITEMS_FAILURE' as const;

export const UPDATE_QUANTITY_REQUEST = 'cartItems/UPDATE_QUANTITY_REQUEST' as const;
export const UPDATE_QUANTITY_SUCCESS = 'cartItems/UPDATE_QUANTITY_SUCCESS' as const;
export const UPDATE_QUANTITY_FAILURE = 'cartItems/UPDATE_QUANTITY_FAILURE' as const;

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
  product: Product;
}

interface AddCartItemSuccessAction {
  type: typeof ADD_CART_ITEM_SUCCESS;
  cartItem: CartItem;
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
  cartItems: CartItem[];
}

interface GetCartItemFailureAction {
  type: typeof GET_CART_ITEMS_FAILURE;
  error: AxiosError;
}

interface UpdateQuantityRequestAction {
  type: typeof UPDATE_QUANTITY_REQUEST;
}

interface UpdateQuantitySuccessAction {
  type: typeof UPDATE_QUANTITY_SUCCESS;
  payload: {
    id: number;
    quantity: number;
  };
}

interface UpdateQuantityFailureAction {
  type: typeof UPDATE_QUANTITY_FAILURE;
  error: AxiosError;
}

interface DeleteItemRequestAction {
  type: typeof DELETE_ITEM_REQUEST;
}

interface DeleteItemSuccessAction {
  type: typeof DELETE_ITEM_SUCCESS;
  id: CartItem['id'];
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
  ids: CartItem['id'][];
}

interface DeleteCheckedItemsFailureAction {
  type: typeof DELETE_CHECKED_ITEMS_FAILURE;
  error: AxiosError;
}

export type CheckCartItemAction = {
  type: typeof CHECK_CART_ITEM;
  payload: {
    id: CartItem['id'];
    checked: CartItem['checked'];
  };
};

export type CheckAllCartItemsAction = {
  type: typeof CHECK_ALL_CART_ITEMS;
  checked: boolean;
};

export type AddCartItemAction = AddCartItemRequestAction | AddCartItemSuccessAction | AddCartItemFailureAction;
export type GetCartItemsAction = GetCartItemRequestAction | GetCartItemSuccessAction | GetCartItemFailureAction;
export type UpdateQuantityAction =
  | UpdateQuantityRequestAction
  | UpdateQuantitySuccessAction
  | UpdateQuantityFailureAction;
export type DeleteItemAction = DeleteItemRequestAction | DeleteItemSuccessAction | DeleteItemFailureAction;
export type DeleteCheckedItemsAction =
  | DeleteCheckedItemsRequestAction
  | DeleteCheckedItemsSuccessAction
  | DeleteCheckedItemsFailureAction;

export const getCartItemsRequest = () => async (dispatch: Dispatch<GetCartItemsAction>) => {
  dispatch({ type: GET_CART_ITEMS_REQUEST });

  try {
    const response = await api.get('/cart');
    const cartItems = response.data;

    dispatch({ type: GET_CART_ITEMS_SUCCESS, cartItems });
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_FAILURE, error });
  }
};

export const addCartItemRequest = (product: Product) => async (dispatch: Dispatch<AddCartItemAction>) => {
  dispatch({ type: ADD_CART_ITEM_REQUEST, product });

  try {
    const response = await api.post('/cart', { product, quantity: 1 });

    dispatch({ type: ADD_CART_ITEM_SUCCESS, cartItem: response.data });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_FAILURE, error });
    throw error;
  }
};

export const updateQuantityRequest = (id: number, quantity: number) => async (
  dispatch: Dispatch<UpdateQuantityAction>
) => {
  dispatch({ type: UPDATE_QUANTITY_REQUEST });

  try {
    await api.patch(`/cart/${id}`, { quantity });

    dispatch({ type: UPDATE_QUANTITY_SUCCESS, payload: { id, quantity } });
  } catch (error) {
    dispatch({ type: UPDATE_QUANTITY_FAILURE, error });
  }
};

export const checkCartItem = (id: CartItem['id'], checked: CartItem['checked']) => ({
  type: CHECK_CART_ITEM,
  payload: { id, checked },
});

export const checkAllCartItems = (checked: boolean) => ({
  type: CHECK_ALL_CART_ITEMS,
  checked,
});

export const deleteItemActionRequest = (id: CartItem['id']) => async (dispatch: Dispatch<DeleteItemAction>) => {
  dispatch({ type: DELETE_ITEM_REQUEST });

  try {
    await api.delete(`/cart/${id}`);

    dispatch({ type: DELETE_ITEM_SUCCESS, id });
  } catch (error) {
    dispatch({ type: DELETE_ITEM_FAILURE, error });
  }
};

export const deleteCheckedItemsActionRequest = (ids: CartItem['id'][]) => async (
  dispatch: Dispatch<DeleteCheckedItemsAction>
) => {
  dispatch({ type: DELETE_CHECKED_ITEMS_REQUEST });

  try {
    ids.forEach(async (id) => {
      await api.delete(`/cart/${id}`);
    });

    dispatch({ type: DELETE_CHECKED_ITEMS_SUCCESS, ids });
  } catch (error) {
    dispatch({ type: DELETE_CHECKED_ITEMS_FAILURE, error });
  }
};
