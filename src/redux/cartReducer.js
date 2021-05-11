import { getPropertyRemoved } from '../utils';

/* ACTION TYPE */

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_SELECTED_PRODUCTS = 'REMOVE_SELECTED_PRODUCTS';

export const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION';
export const TOGGLE_ALL_PRODUCTS_SELECTION = 'TOGGLE_ALL_PRODUCTS_SELECTION';

export const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
export const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
export const INPUT_PRODUCT_QUANTITY = 'INPUT_PRODUCT_QUANTITY';

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

export function toggleProductSelection(id) {
  return {
    type: TOGGLE_PRODUCT_SELECTION,
    payload: id,
  };
}

export function toggleAllProductsSelection(willBeSelected) {
  return {
    type: TOGGLE_ALL_PRODUCTS_SELECTION,
    payload: willBeSelected,
  };
}

export function incrementProductQuantity(id) {
  return {
    type: INCREMENT_PRODUCT_QUANTITY,
    payload: id,
  };
}

export function decrementProductQuantity(id) {
  return {
    type: DECREMENT_PRODUCT_QUANTITY,
    payload: id,
  };
}

export function inputProductQuantity(id, quantity) {
  return {
    type: INPUT_PRODUCT_QUANTITY,
    payload: { id, quantity },
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
    /* payload: product */
    case ADD_PRODUCT:
      return { ...state, [payload.id]: { ...payload, ...INITIAL_CART_PRODUCT_PROPS } };

    /* payload: id */
    case REMOVE_PRODUCT:
      return getPropertyRemoved({ ...state }, payload);

    case REMOVE_SELECTED_PRODUCTS:
      const leftProducts = Object.entries(state).filter(([_, product]) => !product.isSelected);
      return Object.fromEntries(leftProducts);

    /* payload: id */
    case TOGGLE_PRODUCT_SELECTION:
      const willBeSelected = !state[payload].isSelected;
      return { ...state, [payload]: { ...state[payload], isSelected: willBeSelected } };

    /* payload: willBeSelected */
    case TOGGLE_ALL_PRODUCTS_SELECTION:
      return Object.entries(state).reduce(
        (acc, [id]) => {
          acc[id].isSelected = payload;
          return acc;
        },
        { ...state }
      );

    /* payload: id */
    case INCREMENT_PRODUCT_QUANTITY:
      const incrementedQuantity = state[payload].quantity + 1;
      return { ...state, [payload]: { ...state[payload], quantity: incrementedQuantity } };

    /* payload: id */
    case DECREMENT_PRODUCT_QUANTITY:
      const decrementedQuantity = state[payload].quantity - 1;
      return { ...state, [payload]: { ...state[payload], quantity: decrementedQuantity } };

    /* payload: { id, quantity } */
    case INPUT_PRODUCT_QUANTITY:
      return { ...state, [payload.id]: { ...state[payload.id], quantity: payload.quantity } };

    default:
      return state;
  }
};
