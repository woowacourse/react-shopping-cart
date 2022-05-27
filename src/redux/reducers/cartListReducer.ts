import { CartListAction, CartListActionType } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

interface CartItemState {
  loading: boolean;
  error: string | null;
  data: CartItem[];
}

const initialState: CartItemState = {
  loading: false,
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction) => {
  switch (action.type) {
    case CartListActionType.GET_CART_LIST_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.GET_CART_LIST_SUCCESS: {
      return { loading: false, error: null, data: action.payload };
    }
    case CartListActionType.GET_CART_LIST_FAILURE:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.PUT_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.PUT_CART_ITEM_SUCCESS: {
      const prevCartList = state.data;
      const targetItem = action.payload;
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { loading: false, error: null, data: newCartList };
    }
    case CartListActionType.PUT_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.POST_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.POST_CART_ITEM_SUCCESS:
      return { loading: false, error: null, data: [...state.data, action.payload] };
    case CartListActionType.POST_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.REMOVE_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.REMOVE_CART_ITEM_SUCCESS: {
      const itemDeletedCartList = state.data.filter(item => item.id !== action.payload.id);

      return {
        loading: false,
        error: null,
        data: itemDeletedCartList,
      };
    }
    case CartListActionType.REMOVE_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };
    default:
      return state;
  }
};
