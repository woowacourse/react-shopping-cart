import productAPI from 'api/productAPI';
import { ERROR_MESSAGE } from 'constant/messages';
import { addProductCart } from 'store/action/cartActions';
import { updateSnackBar } from 'store/action/snackBarActions';

const targetProductAsyncThunk = id => async dispatch => {
  try {
    const product = await productAPI.getTargetProduct(id);

    dispatch(addProductCart(product));
  } catch (error) {
    dispatch(updateSnackBar(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS));
  }
};

export { targetProductAsyncThunk };
