import { combineReducers } from "redux";
import * as productAPI from "../api";
import { LOAD_ITEM_AMOUNT } from "../constants";
import createReducer from "./createReducer";

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";

const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";

const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";
const GET_PRODUCTS_END = "products/GET_PRODUCTS_END";

const INITIAL_STATE = {
  PRODUCT: {
    isLoading: false,
    data: {},
    error: null,
  },
  PRODUCTS: {
    isLoading: false,
    data: [],
    error: null,
    isEnd: false,
    page: 1,
  },
};

export const getProductsByPage = () => async (dispatch, getState) => {
  const {
    products: { isLoading, page },
  } = getState();

  if (isLoading) return;

  dispatch({ type: GET_PRODUCTS });

  try {
    const products = await productAPI.getProductsByPage(page);

    if (products.data.length < LOAD_ITEM_AMOUNT) {
      return dispatch({ type: GET_PRODUCTS_END, products: products.data });
    }
    dispatch({ type: GET_PRODUCTS_SUCCESS, products: products.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });
  try {
    const product = await productAPI.getProductById(id);
    dispatch({ type: GET_PRODUCT_SUCCESS, product: product.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error });
  }
};

const getProducts = (productsState) => ({
  ...productsState,
  isLoading: true,
  error: null,
});

const getProductsSuccess = (productsState, action) => ({
  isLoading: false,
  data: productsState.data.concat(action.products),
  error: null,
  isEnd: false,
  page: productsState.page + 1,
});

const getProductsError = (productsState, action) => ({
  ...productsState,
  isLoading: false,
  data: null,
  error: action.error,
});

const getProductsEnd = (productsState, action) => ({
  ...productsState,
  data: productsState.data.concat(action.products),
  isLoading: false,
  isEnd: true,
});

const getProduct = () => ({
  isLoading: true,
  data: {},
  error: null,
});

const getProductSuccess = (_, action) => ({
  isLoading: false,
  data: action.product,
  error: null,
});

const getProductError = () => ({
  isLoading: false,
  data: {},
  error: null,
});

const productsReducer = createReducer(INITIAL_STATE.PRODUCTS, {
  [GET_PRODUCTS]: getProducts,
  [GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [GET_PRODUCTS_ERROR]: getProductsError,
  [GET_PRODUCTS_END]: getProductsEnd,
});

const productReducer = createReducer(INITIAL_STATE.PRODUCT, {
  [GET_PRODUCT]: getProduct,
  [GET_PRODUCT_SUCCESS]: getProductSuccess,
  [GET_PRODUCT_ERROR]: getProductError,
});

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
});
export default appReducer;
