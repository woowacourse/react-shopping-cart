const CART_ACTION_TYPES = {
  ADD_PRODUCT: 'CART_ADD_PRODUCT',
};

const addProductCart = product => {
  return {
    type: CART_ACTION_TYPES.ADD_PRODUCT,
    payload: {
      product,
    },
  };
};

export { CART_ACTION_TYPES, addProductCart };
