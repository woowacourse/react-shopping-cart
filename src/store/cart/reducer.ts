import { ProductType } from '@/domain/product';
import { CartActionType } from '@/store/cart/action';

interface CartState {
  readonly cartList: ProductType[];
  readonly isLoading: boolean;
  readonly loadingCartProductId: number | null;
  readonly checkedCartItem: number[];
}

const initialState: CartState = {
  cartList: [],
  isLoading: false,
  loadingCartProductId: null,
  checkedCartItem: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case CartActionType.DELETE_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.DELETE_CART_SUCCEEDED: {
      const {
        payload: { deletedCartId },
      } = action;

      const newCartList = state.cartList.filter(cart => cart.id !== deletedCartId);
      return { ...state, isLoading: false, cartList: newCartList };
    }

    case CartActionType.DELETE_CART_FAILED: {
      return { ...state, isLoading: false };
    }

    case CartActionType.PATCH_CART_START: {
      const {
        payload: { id },
      } = action;

      return { ...state, loadingCartProductId: id };
    }

    case CartActionType.PATCH_CART_SUCCEEDED: {
      const {
        payload: { id, newCartProduct },
      } = action;

      const newCartList = state.cartList.map(cart => {
        if (cart.id === id) {
          return newCartProduct;
        }
        return cart;
      });

      return { ...state, loadingCartProductId: null, cartList: newCartList };
    }

    case CartActionType.PATCH_CART_FAILED: {
      return { ...state, loadingCartProductId: null };
    }

    case CartActionType.CHECK_CART_ITEM: {
      const {
        payload: { id },
      } = action;

      if (state.checkedCartItem.includes(id)) {
        return {
          ...state,
          checkedCartItem: state.checkedCartItem.filter(checkedId => checkedId !== id),
        };
      }
      return { ...state, checkedCartItem: [...state.checkedCartItem, id] };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
