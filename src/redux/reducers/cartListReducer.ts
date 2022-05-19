import { CartListAction, CartListActionType } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

export interface CartItemState {
  readonly loading_get: boolean;
  readonly loading_post: boolean;
  readonly loading_put: boolean;
  readonly loading_patch: boolean;
  readonly error: string | null;
  readonly data: CartItem[];
}

const initialState: CartItemState = {
  loading_get: false,
  loading_post: false,
  loading_put: false,
  loading_patch: false,
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction) => {
  switch (action.type) {
    case CartListActionType.GET_CART_LIST_START:
      return { ...state, loading_get: true };
    case CartListActionType.GET_CART_LIST_SUCCESS:
      return { ...state, loading_get: false, data: action.payload };
    case CartListActionType.GET_CART_LIST_FAILURE:
      return { ...state, loading_get: false, error: action.payload };

    case CartListActionType.PUT_CART_ITEM_START:
      return { ...state, loading_put: true };
    case CartListActionType.PUT_CART_ITEM_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading_put: false, data: newCartList };
    }
    case CartListActionType.PUT_CART_ITEM_FAILURE:
      return { ...state, loading_put: false, error: action.payload };

    case CartListActionType.POST_CART_ITEM_START:
      return { ...state, loading_post: true };
    case CartListActionType.POST_CART_ITEM_SUCCESS:
      return { ...state, loading_post: false, data: [...state.data, action.payload] };
    case CartListActionType.POST_CART_ITEM_FAILURE:
      return { ...state, loading_post: false, error: action.payload };

    case CartListActionType.PATCH_CART_SELECTED_START:
      return { ...state, loading_patch: true };
    case CartListActionType.PATCH_CART_SELECTED_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading_patch: false, data: newCartList };
    }
    case CartListActionType.PATCH_CART_SELECTED_FAILURE:
      return { ...state, loading_patch: false, error: action.payload };
    default:
      return state;
  }
};
