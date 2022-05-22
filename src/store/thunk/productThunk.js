import productAPI from 'api/productAPI';
import cookieStorage from 'storage/cookieStorage';
import { ALERT_MESSAGE, ERROR_MESSAGE } from 'constant/messages';
import { addProductCart } from 'store/action/cartActions';
import { updateProducts } from 'store/action/productsActions';
import { updateSnackBar } from 'store/action/snackBarActions';

const productListAsyncThunk = () => async dispatch => {
  try {
    const responseData = await productAPI.getProducts();

    dispatch(updateProducts(responseData));
  } catch (error) {
    dispatch(updateSnackBar(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS));
  }
};

const cartProductsAsyncThunk = idList => async dispatch => {
  try {
    const products = await productAPI.getTargetProducts(idList);

    products.forEach(product => dispatch(addProductCart(product)));
  } catch (error) {
    dispatch(updateSnackBar(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS));
  }
};

const addCartProductThunk = product => dispatch => {
  dispatch(addProductCart(product));
  cookieStorage.addCartProductId(product.id);
  dispatch(updateSnackBar(`${product.name} ${ALERT_MESSAGE.ADD_CART}`));
};

export { productListAsyncThunk, cartProductsAsyncThunk, addCartProductThunk };
