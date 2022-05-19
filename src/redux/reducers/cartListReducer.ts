import { CartListAction, CartListActionType } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

export interface CartItemState {
  readonly loading_getCartList: boolean;
  readonly loading_postCartList: boolean;
  readonly loading_putCartItem: boolean;
  readonly loading_patchCartSelected: boolean;
  readonly loading_patchAllCartSelected: boolean;
  readonly error: string | null;
  readonly data: CartItem[];
}

const initialState: CartItemState = {
  loading_getCartList: false,
  loading_postCartList: false,
  loading_putCartItem: false,
  loading_patchCartSelected: false,
  loading_patchAllCartSelected: false,
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction) => {
  switch (action.type) {
    case CartListActionType.GET_CART_LIST_START:
      return { ...state, loading_getCartList: true };
    case CartListActionType.GET_CART_LIST_SUCCESS:
      return { ...state, loading_getCartList: false, data: action.payload };
    case CartListActionType.GET_CART_LIST_FAILURE:
      return { ...state, loading_getCartList: false, error: action.payload };

    case CartListActionType.PUT_CART_ITEM_START:
      return { ...state, loading_putCartItem: true };
    case CartListActionType.PUT_CART_ITEM_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading_putCartItem: false, data: newCartList };
    }
    case CartListActionType.PUT_CART_ITEM_FAILURE:
      return { ...state, loading_putCartItem: false, error: action.payload };

    case CartListActionType.POST_CART_ITEM_START:
      return { ...state, loading_postCartList: true };
    case CartListActionType.POST_CART_ITEM_SUCCESS:
      return { ...state, loading_postCartList: false, data: [...state.data, action.payload] };
    case CartListActionType.POST_CART_ITEM_FAILURE:
      return { ...state, loading_postCartList: false, error: action.payload };

    case CartListActionType.PATCH_CART_SELECTED_START:
      return { ...state, loading_patchCartSelected: true };
    case CartListActionType.PATCH_CART_SELECTED_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading_patchCartSelected: false, data: newCartList };
    }
    case CartListActionType.PATCH_CART_SELECTED_FAILURE:
      return { ...state, loading_patchCartSelected: false, error: action.payload };

    case CartListActionType.PATCH_ALL_CART_SELECTED_START:
      return { ...state, loading_patchAllCartSelected: true };
    case CartListActionType.PATCH_ALL_CART_SELECTED_SUCCESS: {
      return { ...state, loading_patchAllCartSelected: false, data: action.payload };
    }
    case CartListActionType.PATCH_ALL_CART_SELECTED_FAILURE:
      return { ...state, loading_patchAllCartSelected: false, error: action.payload };
    default:
      return state;
  }
};
