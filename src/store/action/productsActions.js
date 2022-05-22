const PRODUCTS_ACTION_TYPE = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  CLEAR_PRODUCTS: 'CLEAR_PRODUCTS',
};

const updateProducts = products => {
  return {
    type: PRODUCTS_ACTION_TYPE.UPDATE_PRODUCTS,
    payload: {
      products,
    },
  };
};

const clearProducts = () => {
  return {
    type: PRODUCTS_ACTION_TYPE.CLEAR_PRODUCTS,
  };
};

export { PRODUCTS_ACTION_TYPE, updateProducts, clearProducts };
