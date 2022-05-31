import { ProductType } from '@/domain/product';
import { CartActionType } from '@/store/cart/action';

export interface CartState {
  readonly cartList: ProductType[];
  readonly isLoading: boolean;
  readonly loadingCartProductId: number | null;
  readonly selectedCartItem: number[];
}

const initialState: CartState = {
  cartList: [],
  isLoading: false,
  loadingCartProductId: null,
  selectedCartItem: [],
};

const cartReducer = (state = initialState, action): CartState => {
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

    case CartActionType.ADD_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.ADD_CART_SUCCEEDED: {
      const {
        payload: { product },
      } = action;

      return { ...state, cartList: [...state.cartList, product], isLoading: false };
    }

    case CartActionType.ADD_CART_FAILED: {
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

    case CartActionType.DELETE_SELECTED_CART_ITEM_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.DELETE_SELECTED_CART_ITEM_SUCCEEDED: {
      const {
        payload: { selectedCartItem },
      } = action;

      return {
        ...state,
        isLoading: false,
        cartList: state.cartList.filter(cart => !selectedCartItem.includes(cart.id)),
        selectedCartItem: [],
      };
    }

    case CartActionType.DELETE_SELECTED_CART_ITEM_FAILED: {
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

    case CartActionType.SELECT_CART_ITEM: {
      const {
        payload: { id },
      } = action;

      if (state.selectedCartItem.includes(id)) {
        return {
          ...state,
          selectedCartItem: state.selectedCartItem.filter(selectedId => selectedId !== id),
        };
      }
      return { ...state, selectedCartItem: [...state.selectedCartItem, id] };
    }

    case CartActionType.SELECT_EVERY_CART_ITEM: {
      if (state.selectedCartItem.length === state.cartList.length) {
        return {
          ...state,
          selectedCartItem: [],
        };
      }

      return {
        ...state,
        selectedCartItem: state.cartList.map(cart => cart.id),
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
