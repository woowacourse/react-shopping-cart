import { setCartProductList, startCartProductList } from 'store/cartProductList/actions';
import { CartProductData } from 'types';
import { SET_CART_PRODUCT_LIST, START_CART_PRODUCT_LIST } from 'store/cartProductList/actionTypes';

interface CartProductListState {
  cartProductList: CartProductData[];
  isLoading: boolean;
}

type Action = ReturnType<typeof startCartProductList> | ReturnType<typeof setCartProductList>;

const initialState: CartProductListState = {
  cartProductList: [],
  isLoading: false,
};

const cartProductList = (state: CartProductListState = initialState, action: Action) => {
  if (action.type === START_CART_PRODUCT_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_CART_PRODUCT_LIST) {
    return {
      ...state,
      cartProductList: action.payload.cartProductList,
      isLoading: false,
    };
  }

  return state;
};

export default cartProductList;
