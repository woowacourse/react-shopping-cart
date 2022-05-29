const PRODUCT_ACTION_TYPE = {
  UPDATE_PRODUCT_LIST: 'UPDATE_PRODUCT_LIST',
  CLEAR_PRODUCT_LIST: 'CLEAR_PRODUCT_LIST',
  SELECT_PRODUCT: 'SELECT_PRODUCT',
};

const updateProductList = productList => {
  return {
    type: PRODUCT_ACTION_TYPE.UPDATE_PRODUCT_LIST,
    payload: {
      productList,
    },
  };
};

const clearProductList = () => {
  return {
    type: PRODUCT_ACTION_TYPE.CLEAR_PRODUCT_LIST,
  };
};

const selectProduct = id => {
  return {
    type: PRODUCT_ACTION_TYPE.SELECT_PRODUCT,
    payload: {
      id,
    },
  };
};

export { PRODUCT_ACTION_TYPE, updateProductList, clearProductList, selectProduct };
