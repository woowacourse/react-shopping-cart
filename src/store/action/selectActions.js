const SELECT_ACTION_TYPE = {
  SELECT_PRODUCT: 'SELECT_PRODUCT',
};

const selectProduct = id => {
  return {
    type: SELECT_ACTION_TYPE.SELECT_PRODUCT,
    payload: {
      id,
    },
  };
};

export { selectProduct, SELECT_ACTION_TYPE };
