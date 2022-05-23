import * as API from "../api";
import createReducer from "./createReducer";

export const GET_PRODUCT = "product/GET_PRODUCT";
export const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR";

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });

  try {
    const product = await API.getProductById(id);
    dispatch({ type: GET_PRODUCT_SUCCESS, product: product.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error });
  }
};

const getProduct = () => ({
  loading: true,
  data: {},
  error: null,
});

const getProductSuccess = (_, action) => ({
  loading: false,
  data: action.product,
  error: null,
});

const getProductError = () => ({
  loading: false,
  data: {},
  error: true,
});

const productReducer = createReducer(
  {},
  {
    [GET_PRODUCT]: getProduct,
    [GET_PRODUCT_SUCCESS]: getProductSuccess,
    [GET_PRODUCT_ERROR]: getProductError,
  }
);

export default productReducer;
