import { getPropertyRemoved } from '../utils';

/* ACTION TYPE */

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_SELECTED_PRODUCTS = 'REMOVE_SELECTED_PRODUCTS';

/* ACTION CREATOR */

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export function removeProduct(id) {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
}

export function removeSelectedProducts() {
  return {
    type: REMOVE_SELECTED_PRODUCTS,
  };
}

/* REDUCER */

export const INITIAL_STATE = {};

export const INITIAL_CART_PRODUCT_PROPS = {
  quantity: 1,
  isSelected: true,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type = '', payload = '' } = action;

  switch (type) {
    case ADD_PRODUCT:
      return { ...state, [payload.id]: { ...payload, ...INITIAL_CART_PRODUCT_PROPS } };

    case REMOVE_PRODUCT:
      return getPropertyRemoved({ ...state }, payload);

    case REMOVE_SELECTED_PRODUCTS:
      const leftProducts = Object.entries(state).filter(([_, product]) => !product.isSelected);
      return Object.fromEntries(leftProducts);

    default:
      return state;
  }
};
