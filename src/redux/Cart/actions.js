export const ADD_TO_CART_SUCCESS = 'cart/add_to_cart/success';
export const ADD_TO_CART_ERROR = 'cart/add_to_cart/error';
export const TOGGLE_CART_CHECKBOX = 'cart/toggle_cart_checkbox';
export const CHANGE_ALL_CHECKBOXES_IN_CART = 'cart/change_all_checkboxes_in_cart';
export const CHANGE_AMOUNT = 'cart/change_amount';
export const REMOVE_CHECKED_PRODUCTS_SUCCESS = 'cart/remove_checked_products/success';
export const REMOVE_CHECKED_PRODUCTS_ERROR = 'cart/remove_checked_products/error';
export const REMOVE_PRODUCT_SUCCESS = 'cart/remove_product/success';
export const REMOVE_PRODUCT_ERROR = 'cart/remove_product/error';

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

export const removeCheckedProducts = () => {
  return {
    type: REMOVE_CHECKED_PRODUCTS_SUCCESS,
  };
};

export const removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT_SUCCESS,
    productId,
  };
};
