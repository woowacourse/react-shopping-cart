import { addCart, deleteCart, getCart, patchCart } from '@/api/cart';
import { ProductType } from '@/domain/product';
import { Dispatch } from 'redux';
export const enum CartActionType {
  GET_CART_START = 'cart/GET_CART_START',
  GET_CART_SUCCEEDED = 'cart/GET_CART_SUCCEEDED',
  GET_CART_FAILED = 'cart/GET_CART_FAILED',

  ADD_CART_START = 'cart/ADD_CART_START',
  ADD_CART_SUCCEEDED = 'cart/ADD_CART_SUCCEEDED',
  ADD_CART_FAILED = 'cart/ADD_CART_FAILED',

  DELETE_CART_START = 'cart/DELETE_CART_START',
  DELETE_CART_SUCCEEDED = 'cart/DELETE_CART_SUCCEEDED',
  DELETE_CART_FAILED = 'cart/DELETE_CART_FAILED',

  DELETE_SELECTED_CART_ITEM_START = 'cart/DELETE_SELECTED_CART_ITEM_START',
  DELETE_SELECTED_CART_ITEM_SUCCEEDED = 'cart/DELETE_SELECTED_CART_ITEM_SUCCEEDED',
  DELETE_SELECTED_CART_ITEM_FAILED = 'cart/DELETE_SELECTED_CART_ITEM_FAILED',

  PATCH_CART_START = 'cart/PATCH_CART_START',
  PATCH_CART_SUCCEEDED = 'cart/PATCH_CART_SUCCEEDED',
  PATCH_CART_FAILED = 'cart/PATCH_CART_FAILED',

  SELECT_CART_ITEM = 'cart/SELECT_CART_ITEM',
  SELECT_EVERY_CART_ITEM = 'cart/SELECT_EVERY_CART_ITEM',
}

interface GetCartStart {
  type: CartActionType.GET_CART_START;
}

interface GetCartSucceeded {
  type: CartActionType.GET_CART_SUCCEEDED;
  payload: {
    cartList: ProductType[];
  };
}

interface GetCartFailed {
  type: CartActionType.GET_CART_FAILED;
}

interface AddCartStart {
  type: CartActionType.ADD_CART_START;
}

interface AddCartSucceeded {
  type: CartActionType.ADD_CART_SUCCEEDED;
  payload: {
    product: ProductType;
  };
}

interface AddCartFailed {
  type: CartActionType.ADD_CART_FAILED;
}

interface DeleteCartStart {
  type: CartActionType.DELETE_CART_START;
}

interface DeleteCartSucceeded {
  type: CartActionType.DELETE_CART_SUCCEEDED;
  payload: { deletedCartId: number };
}

interface DeleteCartFailed {
  type: CartActionType.DELETE_CART_FAILED;
}

interface DeleteSelectedCartItemStart {
  type: CartActionType.DELETE_SELECTED_CART_ITEM_START;
}

interface DeleteSelectedCartItemSucceeded {
  type: CartActionType.DELETE_SELECTED_CART_ITEM_SUCCEEDED;
}

interface DeleteSelectedCartItemFailed {
  type: CartActionType.DELETE_SELECTED_CART_ITEM_FAILED;
}

interface PatchCartStart {
  type: CartActionType.PATCH_CART_START;
}

interface PatchCartSucceeded {
  type: CartActionType.PATCH_CART_SUCCEEDED;
}

interface PatchCartFailed {
  type: CartActionType.PATCH_CART_FAILED;
}

interface SelectCartItem {
  type: CartActionType.SELECT_CART_ITEM;
  payalod: { id: number };
}

interface SelectEveryCartItem {
  type: CartActionType.SELECT_EVERY_CART_ITEM;
}

export type CartAction =
  | GetCartStart
  | GetCartSucceeded
  | GetCartFailed
  | AddCartStart
  | AddCartSucceeded
  | AddCartFailed
  | DeleteCartStart
  | DeleteCartSucceeded
  | DeleteCartFailed
  | DeleteSelectedCartItemStart
  | DeleteSelectedCartItemSucceeded
  | DeleteSelectedCartItemFailed
  | PatchCartStart
  | PatchCartSucceeded
  | PatchCartFailed
  | SelectCartItem
  | SelectEveryCartItem;

export const fetchGetCartAsync = () => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: CartActionType.GET_CART_START });

  try {
    const { data: cartList } = await getCart();

    dispatch({ type: CartActionType.GET_CART_SUCCEEDED, payload: { cartList } });
  } catch ({ message }) {
    dispatch({ type: CartActionType.GET_CART_FAILED });
  }
};

export const fetchAddCartAsync = product => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: CartActionType.ADD_CART_START });

  try {
    await addCart(product);

    dispatch({ type: CartActionType.ADD_CART_SUCCEEDED, payload: { product } });
  } catch ({ message }) {
    dispatch({ type: CartActionType.ADD_CART_FAILED });
  }
};

export const fetchDeleteCartAsync = id => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: CartActionType.DELETE_CART_START });

  try {
    await deleteCart(id);

    dispatch({ type: CartActionType.DELETE_CART_SUCCEEDED, payload: { deletedCartId: id } });
  } catch ({ message }) {
    dispatch({ type: CartActionType.DELETE_CART_FAILED });
  }
};

export const fetchDeleteSelectedCartItemAsync =
  selectedCartItem => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.DELETE_SELECTED_CART_ITEM_START });

    try {
      await Promise.all(selectedCartItem.map(id => deleteCart(id)));

      dispatch({
        type: CartActionType.DELETE_SELECTED_CART_ITEM_SUCCEEDED,
        payload: {
          selectedCartItem,
        },
      });
    } catch ({ message }) {
      dispatch({ type: CartActionType.DELETE_SELECTED_CART_ITEM_FAILED });
    }
  };

export const fetchPatchCartAsync =
  (id, newCartProduct) => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.PATCH_CART_START, payload: { id } });
    try {
      await patchCart(id, newCartProduct);
      dispatch({ type: CartActionType.PATCH_CART_SUCCEEDED, payload: { id, newCartProduct } });
    } catch ({ message }) {
      dispatch({ type: CartActionType.PATCH_CART_FAILED });
    }
  };
