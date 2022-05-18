import productAPI from 'api/productAPI';
import { ERROR_MESSAGE } from 'constant/messages';
import { updateSnackBar } from './snackBarActions';

const PRODUCTS_ACTION_TYPE = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  CLEAR_PRODUCTS: 'CLEAR_PRODUCTS',
};

const productsAsyncThunk = () => async dispatch => {
  try {
    const responseData = await productAPI.getProducts();

    dispatch({
      type: PRODUCTS_ACTION_TYPE.UPDATE_PRODUCTS,
      products: responseData,
    });
  } catch (error) {
    dispatch(updateSnackBar(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS));
  }
};

const clearProducts = () => {
  return {
    type: PRODUCTS_ACTION_TYPE.CLEAR_PRODUCTS,
  };
};

export { PRODUCTS_ACTION_TYPE, productsAsyncThunk, clearProducts };
