const ACTION_TYPE = {
  ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
  SUBTRACT_CART_PRODUCT_QUANTITY: 'SUBTRACT_CART_PRODUCT_QUANTITY',
  TOGGLE_ALL_CART_PRODUCTS_CHECK: 'TOGGLE_ALL_CART_PRODUCTS_CHECK',
  TOGGLE_CART_PRODUCT_CHECK: 'TOGGLE_CART_PRODUCT_CHECK',
  REMOVE_SELECTED_PRODUCTS_FROM_CART: 'REMOVE_SELECTED_PRODUCTS_FROM_CART',
  REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
};

const addProductToCart = (id, image, name, price) => ({
  type: ACTION_TYPE.ADD_PRODUCT_TO_CART,
  payload: { id, image, name, price },
});

const subtractCartProductQuantity = id => ({
  type: ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY,
  payload: { id },
});

const toggleAllCartProductsCheck = checked => ({
  type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
  payload: { checked },
});

const toggleCartProductCheck = id => ({
  type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK,
  payload: { id },
});

const removeSelectedProductsFromCart = () => ({
  type: ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART,
});

const removeProductFromCart = id => ({
  type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART,
  payload: { id },
});

export default ACTION_TYPE;

export {
  addProductToCart,
  subtractCartProductQuantity,
  toggleAllCartProductsCheck,
  toggleCartProductCheck,
  removeSelectedProductsFromCart,
  removeProductFromCart,
};
