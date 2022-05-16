import productAPI from 'api/productAPI';

const ACTION_TYPE = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  CLEAR_PRODUCTS: 'CLEAR_PRODUCTS',
};

const productsAsyncThunk = () => async dispatch => {
  const responseData = await productAPI.getProducts();

  dispatch({
    type: ACTION_TYPE.UPDATE_PRODUCTS,
    products: responseData,
  });
};

const clearProducts = () => {
  return {
    type: ACTION_TYPE.CLEAR_PRODUCTS,
  };
};

export { ACTION_TYPE, productsAsyncThunk, clearProducts };
