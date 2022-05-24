import { CartAction, CartStoreState } from 'types/index';

import { cartTypes } from 'redux/actions';
import isProductInCart from 'utils/validator';

const initialState: CartStoreState = {
  cart: [],
};

const cart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT: {
      if (!isProductInCart(action.payload, state.cart)) {
        return {
          ...state,
          cart: [
            ...state.cart,
            { id: action.payload, stock: 1, checked: true },
          ],
        };
      }

      const newCart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return { ...product, stock: product.stock + 1 };
        }
        return product;
      });

      return { ...state, cart: newCart };
    }
    case cartTypes.DELETE_PRODUCT: {
      const newCart = state.cart.filter(
        (product) => product.id !== action.payload
      );

      return { ...state, cart: newCart };
    }
    case cartTypes.DELETE_CHECKED_PRODUCT: {
      const newCart = state.cart.filter((product) => product.checked === false);

      return { ...state, cart: newCart };
    }
    case cartTypes.TOGGLE_CHECK_ONE: {
      const newCart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return { ...product, checked: !product.checked };
        }
        return product;
      });

      return { ...state, cart: newCart };
    }
    case cartTypes.TOGGLE_CHECK_ALL: {
      const newCart = state.cart.map((product) => ({
        ...product,
        checked: action.payload,
      }));

      return { ...state, cart: newCart };
    }
    case cartTypes.CHANGE_PRODUCT_STOCK: {
      const newCart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            stock: action.payload.stock,
          };
        }
        return product;
      });

      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
};

export default cart;
