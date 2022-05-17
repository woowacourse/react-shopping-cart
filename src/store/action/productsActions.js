import productAPI from 'api/productAPI';

const PRODUCTS_ACTION_TYPE = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  CLEAR_PRODUCTS: 'CLEAR_PRODUCTS',
};

const productsAsyncThunk = () => async dispatch => {
  const responseData = await productAPI.getProducts();

  dispatch({
    type: PRODUCTS_ACTION_TYPE.UPDATE_PRODUCTS,
    products: responseData,
  });
};

const clearProducts = () => {
  return {
    type: PRODUCTS_ACTION_TYPE.CLEAR_PRODUCTS,
  };
};

export { PRODUCTS_ACTION_TYPE, productsAsyncThunk, clearProducts };
