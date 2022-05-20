const CART_ACTION_TYPES = {
  ADD_PRODUCT: 'CART_ADD_PRODUCT',
  SUBTRACT_PRODUCT: 'SUBTRACT_PRODUCT',
  CHECK_PRODUCT: 'CHECK_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
};

const addProductCart = product => {
  return {
    type: CART_ACTION_TYPES.ADD_PRODUCT,
    payload: {
      product,
    },
  };
};

const subtractProductCart = product => {
  return {
    type: CART_ACTION_TYPES.SUBTRACT_PRODUCT,
    payload: {
      product,
    },
  };
};

const checkProductCart = (product, checked) => {
  return {
    type: CART_ACTION_TYPES.CHECK_PRODUCT,
    payload: {
      product,
      checked,
    },
  };
};

const removeProductCart = product => {
  return {
    type: CART_ACTION_TYPES.REMOVE_PRODUCT,
    payload: {
      product,
    },
  };
};

export {
  CART_ACTION_TYPES,
  addProductCart,
  subtractProductCart,
  checkProductCart,
  removeProductCart,
};
