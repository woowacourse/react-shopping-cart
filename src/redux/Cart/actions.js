export const ADD_TO_CART_SUCCESS = 'cart/add_to_cart/success';
export const ADD_TO_CART_ERROR = 'cart/add_to_cart/error';
export const TOGGLE_CART_CHECKBOX = 'cart/toggle_cart_checkbox';
export const CHANGE_ALL_CHECKBOXES_IN_CART = 'cart/change_all_checkboxes_in_cart';
export const CHANGE_AMOUNT = 'cart/change_amount';
export const REMOVE_FROM_CART_SUCCESS = 'cart/remove_from_cart/success';
export const REMOVE_FROM_CART_ERROR = 'cart/remove_from_cart/error';

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    product,
  };
};

export const toggleCartCheckbox = (productId) => {
  return {
    type: TOGGLE_CART_CHECKBOX,
    productId,
  };
};

export const changeAllCheckboxesInCart = (toCheck) => {
  return {
    type: CHANGE_ALL_CHECKBOXES_IN_CART,
    toCheck,
  };
};

// export const uncheckAllProductsInCart = () => {
//   return {
//     type: UNCHECK_ALL_PRODUCTS_IN_CART,
//   };
// };
