import { addCart, deleteCart, getCart, patchCart } from '@/api/cart';
import { ProductType } from '@/domain/product';
import { Dispatch } from 'redux';
export const enum CartActionType {
  ADD_CART_START = 'cart/ADD_CART_START',
  ADD_CART_SUCCEEDED = 'cart/ADD_CART_SUCCEEDED',
  ADD_CART_FAILED = 'cart/ADD_CART_FAILED',

  GET_CART_START = 'cart/GET_CART_START',
  GET_CART_SUCCEEDED = 'cart/GET_CART_SUCCEEDED',
  GET_CART_FAILED = 'cart/GET_CART_FAILED',

  DELETE_CART_START = 'cart/DELETE_CART_START',
  DELETE_CART_SUCCEEDED = 'cart/DELETE_CART_SUCCEEDED',
  DELETE_CART_FAILED = 'cart/DELETE_CART_FAILED',

  PATCH_CART_START = 'cart/PATCH_CART_START',
  PATCH_CART_SUCCEEDED = 'cart/PATCH_CART_SUCCEEDED',
  PATCH_CART_FAILED = 'cart/PATCH_CART_FAILED',
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

interface PatchCartStart {
  type: CartActionType.PATCH_CART_START;
}

interface PatchCartSucceeded {
  type: CartActionType.PATCH_CART_SUCCEEDED;
}

interface PatchCartFailed {
  type: CartActionType.PATCH_CART_FAILED;
}

export type CartAction =
  | AddCartStart
  | AddCartSucceeded
  | AddCartFailed
  | GetCartStart
  | GetCartSucceeded
  | GetCartFailed
  | DeleteCartStart
  | DeleteCartSucceeded
  | DeleteCartFailed
  | PatchCartStart
  | PatchCartSucceeded
  | PatchCartFailed;

export const fetchAddCartAsync = product => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: CartActionType.ADD_CART_START });

  try {
    await addCart(product);

    dispatch({
      type: CartActionType.ADD_CART_SUCCEEDED,
      payload: {
        product,
      },
    });
  } catch ({ message }) {
    dispatch({
      type: CartActionType.ADD_CART_FAILED,
    });
  }
};

export const fetchGetCartAsync = () => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: CartActionType.GET_CART_START });

  try {
    const { cartList } = await getCart();

    dispatch({ type: CartActionType.GET_CART_SUCCEEDED, payload: { cartList } });
  } catch ({ message }) {
    dispatch({ type: CartActionType.GET_CART_FAILED });
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

export const fetchPatchCartAsync =
  (id, newCartProduct) => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.PATCH_CART_START });
    try {
      await patchCart(id, newCartProduct);
      dispatch({ type: CartActionType.PATCH_CART_SUCCEEDED, payload: { id, newCartProduct } });
    } catch ({ message }) {
      dispatch({ type: CartActionType.PATCH_CART_FAILED });
    }
  };
