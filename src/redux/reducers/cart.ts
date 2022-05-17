import { CartAction, CartState } from 'types';

import { cartTypes } from 'redux/actions/actions';
import isProductInCart from 'utils/validator';

const initialState: CartState = {
  cart: [],
};

const cart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT: {
      if (!isProductInCart(action.payload, state.cart)) {
        return {
          ...state,
          cart: [...state.cart, { id: action.payload, stock: 1 }],
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
    default:
      return state;
  }
};

export default cart;
