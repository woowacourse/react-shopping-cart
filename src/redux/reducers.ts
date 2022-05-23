import { StoreState, Action } from '../types';
import { TYPES } from './actions';

const initialState: StoreState = {
  isLoading: false,
  error: null,
  productList: [],
  productDetail: null,
  cart: [{ id: '1', quantity: 1, checked: true }],
  cartItems: [],
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.GET_PRODUCT_LIST}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_LIST}_FULFILLED`: {
      return { ...state, isLoading: false, productList: action.payload };
    }
    case `${TYPES.GET_PRODUCT_LIST}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_FULFILLED`: {
      return { ...state, isLoading: false, productDetail: action.payload };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case TYPES.ADD_ITEM_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, checked: true }],
      };
    }
    case `${TYPES.GET_CART_ITEMS}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_CART_ITEMS}_FULFILLED`: {
      return { ...state, isLoading: false, cartItems: action.payload };
    }
    case `${TYPES.GET_CART_ITEMS}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case TYPES.HANDLE_CHANGE_QUANTITY: {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }

        return item;
      });

      return { ...state, cart: updatedCart };
    }
    case TYPES.HANDLE_CHECK: {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            checked: action.payload.checked,
          };
        }

        return item;
      });

      return { ...state, cart: updatedCart };
    }
    case TYPES.REMOVE_CART_ITEM: {
      const updatedCart = state.cart.filter(
        (item) => !action.payload.includes(item.id)
      );

      return { ...state, cart: updatedCart };
    }
    default:
      return state;
  }
};

export default rootReducer;
export { initialState };
