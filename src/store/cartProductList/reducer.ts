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

interface CartProductListState {
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
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_CART_PRODUCT_LIST_SUCCESS) {
    return {
      ...state,
      cartProductList: action.payload.cartProductList,
      isLoading: false,
      isError: false,
    };
  }

  if (action.type === GET_CART_PRODUCT_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  return state;
};

export default cartProductList;
