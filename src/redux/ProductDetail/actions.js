import { ERROR_MESSAGE } from '../../constants/message';
import { API_URL } from '../../constants/api';

export const GET_PRODUCT_SUCCESS = 'product_detail/get_product/success';
export const GET_PRODUCT_PENDING = 'product_detail/get_product/pending';
export const GET_PRODUCT_ERROR = 'product_detail/get_product/error';

export const RESET_PRODUCT = 'product_detail/reset_product';

export const getProduct = (productId) => (dispatch, getState) => {
  dispatch({ type: GET_PRODUCT_PENDING });
  fetch(`${API_URL.PRODUCTS}/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_FETCH_PRODUCT);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: data,
      });
    })
    .catch((e) =>
      dispatch({
        type: GET_PRODUCT_ERROR,
        errorMessage: e.message,
      })
    );
};

export const resetProduct = () => {
  return {
    type: RESET_PRODUCT,
  };
};
