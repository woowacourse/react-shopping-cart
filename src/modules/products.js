import * as API from "../api";
import createReducer from "./createReducer";
import { LOAD_ITEM_AMOUNT } from "../constants/constants";

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";
const GET_PRODUCTS_END = "products/GET_PRODUCTS_END";
export const REPLACE_PRODUCTS = "products/REPLACE_PRODUCTS";

export const getProductsByPage = () => async (dispatch, getState) => {
  const {
    products: { loading, page },
  } = getState();

  if (loading) return;

  dispatch({ type: GET_PRODUCTS });

  try {
    const products = await API.getProductsByPage(page);

    if (products.data.length < LOAD_ITEM_AMOUNT) {
      return dispatch({ type: GET_PRODUCTS_END, products: products.data });
    }
    dispatch({ type: GET_PRODUCTS_SUCCESS, products: products.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

const getProducts = (productsState) => ({
  ...productsState,
  loading: true,
  error: null,
});

const getProductsSuccess = (productsState, action) => ({
  loading: false,
  data: productsState.data.concat(action.products),
  error: null,
  isEnd: false,
  page: productsState.page + 1,
});

const getProductsError = (productsState) => ({
  ...productsState,
  loading: false,
  data: null,
  error: true,
});

const getProductsEnd = (productsState, action) => ({
  ...productsState,
  data: productsState.data.concat(action.products),
  loading: false,
  isEnd: true,
});

const replaceProducts = (productsState, action) => ({
  ...productsState,
  data: action.replaceProducts,
});

const productsReducer = createReducer(
  {},
  {
    [GET_PRODUCTS]: getProducts,
    [GET_PRODUCTS_SUCCESS]: getProductsSuccess,
    [GET_PRODUCTS_ERROR]: getProductsError,
    [GET_PRODUCTS_END]: getProductsEnd,
    [REPLACE_PRODUCTS]: replaceProducts,
  }
);

export default productsReducer;
