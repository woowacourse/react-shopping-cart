import productAPI from 'api/productAPI';

const ACTION_TYPE = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
};

const productsAsyncThunk = () => async dispatch => {
  const responseData = await productAPI.getProducts();

  dispatch({
    type: ACTION_TYPE.UPDATE_PRODUCTS,
    products: responseData,
  });
};

export { ACTION_TYPE, productsAsyncThunk };
