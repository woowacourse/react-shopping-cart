import cartsActionTypes from 'redux/carts/carts.types';

import { CURRENT_USER } from 'constants';

const INITIAL_STATE = {
  isLoading: false,
  carts: [],
  error: null,
};

const cartsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartsActionTypes.addProductToCartStart:
    case cartsActionTypes.fetchCartsStart:
    case cartsActionTypes.deleteProductFromCartStart:
    case cartsActionTypes.deleteCheckedProductsStart:
      return {
        ...state,
        isLoading: true,
      };

    case cartsActionTypes.fetchCartsSuccess:
      return {
        ...state,
        error: null,
        isLoading: false,
        carts: action.payload,
      };

    case cartsActionTypes.deleteProductFromCartError:
    case cartsActionTypes.addProductToCartError:
    case cartsActionTypes.fetchCartsError:
    case cartsActionTypes.deleteCheckedProductsError:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case cartsActionTypes.addProductToCartSuccess:
      return {
        ...state,
        error: null,
        isLoading: false,
      };

    case cartsActionTypes.deleteProductFromCartSuccess:
      return {
        ...state,
        error: null,
        isLoading: false,
      };

    case cartsActionTypes.deleteCheckedProductsSuccess: {
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    }

    case cartsActionTypes.toggleIsChecked: {
      const newCarts = [...state.carts];
      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );
      currentCartProduct['checked'] = !currentCartProduct['checked'];

      return { ...state, carts: newCarts };
    }

    case cartsActionTypes.allToggleIsChecked: {
      const newCarts = state.carts.map((cart) => {
        if (
          cart.user === CURRENT_USER &&
          action.payload === !!cart['checked']
        ) {
          cart['checked'] = !cart['checked'];
        }

        return cart;
      });

      return { ...state, carts: newCarts };
    }

    case cartsActionTypes.increaseProductQuantity: {
      const newCarts = [...state.carts];
      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );

      currentCartProduct['quantity'] =
        typeof currentCartProduct['quantity'] !== 'undefined'
          ? currentCartProduct['quantity'] + 1
          : 2;

      return { ...state, carts: newCarts };
    }

    case cartsActionTypes.decreaseProductQuantity: {
      const newCarts = [...state.carts];
      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );

      if (currentCartProduct['quantity'] === 0) {
        return { ...state };
      }

      currentCartProduct['quantity'] = currentCartProduct['quantity']
        ? currentCartProduct['quantity'] - 1
        : 1;

      return { ...state, carts: newCarts };
    }

    default:
      return state;
  }
};

export default cartsReducer;
