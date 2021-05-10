
/* ACTION TYPE */

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS';

/* ACTION CREATOR */

export function addProduct(product) {
}

export function removeProduct(id) {
}

export function removeProducts(ids) {
}

/* REDUCER */

export const INITIAL_STATE = {};

export const INITIAL_CART_PRODUCT_PROPS = {
  quantity: 1,
  isSelected: true,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
};
