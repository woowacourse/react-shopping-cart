import produce from 'immer';
import {
  getCartProductList,
  getCartProductListSuccess,
  getCartProductListError,
} from 'store/cartProductList/actions';
import { CartProductData } from 'types';
import {
  GET_CART_PRODUCT_LIST,
  GET_CART_PRODUCT_LIST_SUCCESS,
  GET_CART_PRODUCT_LIST_ERROR,
} from 'store/cartProductList/actionTypes';

export interface CartProductListState {
  cartProductList: CartProductData[];
  isLoading: boolean;
  isError: boolean;
}

export type CartProductListAction =
  | ReturnType<typeof getCartProductList>
  | ReturnType<typeof getCartProductListSuccess>
  | ReturnType<typeof getCartProductListError>;

const initialState: CartProductListState = {
  cartProductList: [],
  isLoading: false,
  isError: false,
};

const cartProductList = (
  state: CartProductListState = initialState,
  action: CartProductListAction,
) => {
  if (action.type === GET_CART_PRODUCT_LIST) {
    return produce(state, (draft) => {
      draft.isLoading = true;
    });
  }

  if (action.type === GET_CART_PRODUCT_LIST_SUCCESS) {
    return produce(state, (draft) => {
      draft.cartProductList = action.payload.cartProductList;
      draft.isLoading = false;
      draft.isError = false;
    });
  }

  if (action.type === GET_CART_PRODUCT_LIST_ERROR) {
    return produce(state, (draft) => {
      draft.isLoading = false;
      draft.isError = true;
    });
  }
  return state;
};

export default cartProductList;
