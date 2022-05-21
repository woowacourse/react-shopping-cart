import productAPI from 'apis/productAPI';
import ACTION_TYPE from 'redux/products/productsActions';

const productsAsyncThunk = () => async dispatch => {
  const responseData = await productAPI.getProducts();

  dispatch({
    type: ACTION_TYPE.UPDATE_PRODUCTS,
    payload: responseData,
  });
};

export default productsAsyncThunk;
