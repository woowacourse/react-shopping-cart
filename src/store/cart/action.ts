import { addCart, getCart } from '@/api/api';
import { ProductType } from '@/domain/product';
import { Dispatch } from 'redux';
export const enum CartActionType {
  ADD_CART_START = 'cart/ADD_CART_START',
  ADD_CART_SUCCEEDED = 'cart/ADD_CART_SUCCEEDED',
  ADD_CART_FAILED = 'cart/ADD_CART_FAILED',

  GET_CART_START = 'cart/GET_CART_START',
  GET_CART_SUCCEEDED = 'cart/GET_CART_SUCCEEDED',
  GET_CART_FAILED = 'cart/GET_CART_FAILED',
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

export type CartAction =
  | AddCartStart
  | AddCartSucceeded
  | AddCartFailed
  | GetCartStart
  | GetCartSucceeded
  | GetCartFailed;

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
