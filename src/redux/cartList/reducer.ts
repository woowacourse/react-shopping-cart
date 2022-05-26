import { CartListAction } from 'redux/cartList/action';
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
  loading: 'getCartList',
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction): CartListState => {
  switch (action.type) {
    case 'cart/GET_CART_LIST_REQUEST':
      return { ...state, loading: 'getCartList' };
    case 'cart/GET_CART_LIST_SUCCESS':
      return { ...state, loading: null, data: action.payload };
    case 'cart/GET_CART_LIST_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/PUT_CART_ITEM_REQUEST':
      return { ...state, loading: 'putCartItem' };
    case 'cart/PUT_CART_ITEM_SUCCESS': {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/PUT_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/POST_CART_ITEM_REQUEST':
      return { ...state, loading: 'postCartList' };
    case 'cart/POST_CART_ITEM_SUCCESS':
      return { ...state, loading: null, data: [...state.data, action.payload] };
    case 'cart/POST_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/PATCH_CART_SELECTED_REQUEST':
      return { ...state, loading: 'patchCartSelected' };
    case 'cart/PATCH_CART_SELECTED_SUCCESS': {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/PATCH_CART_SELECTED_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/PATCH_ALL_CART_SELECTED_REQUEST':
      return { ...state, loading: 'patchAllCartSelected' };
    case 'cart/PATCH_ALL_CART_SELECTED_SUCCESS': {
      const newCartList = state.data.map(item => ({ ...item, isSelected: action.payload }));

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/PATCH_ALL_CART_SELECTED_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/DELETE_CART_ITEM_REQUEST':
      return { ...state, loading: 'deleteCartItem' };
    case 'cart/DELETE_CART_ITEM_SUCCESS': {
      const newCartList = state.data.filter(item => item.id !== action.payload);

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/DELETE_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/DELETE_ALL_CART_ITEM_REQUEST':
      return { ...state, loading: 'deleteCartItem' };
    case 'cart/DELETE_ALL_CART_ITEM_SUCCESS': {
      return { ...state, loading: null, data: [] };
    }
    case 'cart/DELETE_ALL_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };
    default:
      return state;
  }
};
