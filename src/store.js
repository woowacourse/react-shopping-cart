import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { fetchProductList } from "./apiRequest";

const GET_PRODUCT_LIST = "GET_PRODUCTS";
const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCT_LIST_ERROR = "GET_PRODUCTS_ERROR";

const actions = {
  getProductList: () => ({ type: GET_PRODUCT_LIST }),
  getProductListSuccess: (productList) => ({
    type: GET_PRODUCT_LIST_SUCCESS,
    payload: productList,
  }),
  getProductListError: (errMessage) => ({
    type: GET_PRODUCT_LIST_ERROR,
    payload: errMessage,
  }),
};

export const getProductList = () => async (dispatch, getState) => {
  if (getState().productList.data) return;

  dispatch(actions.getProductList());

  try {
    const fetchedProductList = await fetchProductList();

    dispatch(actions.getProductListSuccess(fetchedProductList));
  } catch (err) {
    dispatch(actions.getProductListError(err.message));
  }
};

const initialState = {
  productList: {
    loading: true,
    data: null,
    errorMessage: null,
  },
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        productList: {
          loading: true,
          data: null,
          errorMessage: null,
        },
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          data: action.payload,
          errorMessage: null,
        },
      };

    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        productList: {
          loading: false,
          data: null,
          errorMessage: action.payload,
        },
      };

    default:
      return state;
  }
};

const store = createStore(
  productListReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export { store };
