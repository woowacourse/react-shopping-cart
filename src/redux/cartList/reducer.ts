import { CartListAction, CartListActionType } from 'redux/cartList/action';
import { CartItem } from 'types/domain';

export interface CartListState {
  readonly loading:
    | 'getCartList'
    | 'postCartList'
    | 'putCartItem'
    | 'patchCartSelected'
    | 'patchAllCartSelected'
    | 'deleteCartItem'
    | 'deleteAllCartItem'
    | null;
  readonly error: string | null;
  readonly data: CartItem[];
}

export const initialState: CartListState = {
  loading: null,
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction): CartListState => {
  switch (action.type) {
    case CartListActionType.GET_CART_LIST_START:
      return { ...state, loading: 'getCartList' };
    case CartListActionType.GET_CART_LIST_SUCCESS:
      return { ...state, loading: null, data: action.payload };
    case CartListActionType.GET_CART_LIST_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.PUT_CART_ITEM_START:
      return { ...state, loading: 'putCartItem' };
    case CartListActionType.PUT_CART_ITEM_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading: null, data: newCartList };
    }
    case CartListActionType.PUT_CART_ITEM_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.POST_CART_ITEM_START:
      return { ...state, loading: 'postCartList' };
    case CartListActionType.POST_CART_ITEM_SUCCESS:
      return { ...state, loading: null, data: [...state.data, action.payload] };
    case CartListActionType.POST_CART_ITEM_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.PATCH_CART_SELECTED_START:
      return { ...state, loading: 'patchCartSelected' };
    case CartListActionType.PATCH_CART_SELECTED_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading: null, data: newCartList };
    }
    case CartListActionType.PATCH_CART_SELECTED_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.PATCH_ALL_CART_SELECTED_START:
      return { ...state, loading: 'patchAllCartSelected' };
    case CartListActionType.PATCH_ALL_CART_SELECTED_SUCCESS: {
      const newCartList = state.data.map(item => ({ ...item, isSelected: action.payload }));

      return { ...state, loading: null, data: newCartList };
    }
    case CartListActionType.PATCH_ALL_CART_SELECTED_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.DELETE_CART_ITEM_START:
      return { ...state, loading: 'deleteCartItem' };
    case CartListActionType.DELETE_CART_ITEM_SUCCESS: {
      const newCartList = state.data.filter(item => item.id !== action.payload);

      return { ...state, loading: null, data: newCartList };
    }
    case CartListActionType.DELETE_CART_ITEM_FAILURE:
      return { ...state, loading: null, error: action.payload };

    case CartListActionType.DELETE_ALL_CART_ITEM_START:
      return { ...state, loading: 'deleteCartItem' };
    case CartListActionType.DELETE_ALL_CART_ITEM_SUCCESS: {
      return { ...state, loading: null, data: [] };
    }
    case CartListActionType.DELETE_ALL_CART_ITEM_FAILURE:
      return { ...state, loading: null, error: action.payload };
    default:
      return state;
  }
};
