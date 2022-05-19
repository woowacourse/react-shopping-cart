import { ProductType } from '@/domain/product';
import { CartActionType } from '@/store/cart/action';

interface CartState {
  readonly cartList: ProductType[];
  readonly isLoading: boolean;
}

const initialState: CartState = {
  cartList: [],
  isLoading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionType.ADD_CART_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CartActionType.ADD_CART_SUCCEEDED: {
      const {
        payload: { product },
      } = action;

      return {
        ...state,
        cartList: [...state.cartList, product],
        isLoading: false,
      };
    }

    case CartActionType.ADD_CART_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CartActionType.GET_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.GET_CART_SUCCEEDED: {
      const {
        payload: { cartList },
      } = action;

      return { ...state, cartList, isLoading: false };
    }

    case CartActionType.GET_CART_FAILED: {
      return { ...state, isLoading: false };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
