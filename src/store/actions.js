import { fetchProductDetail, fetchProductList } from "../apiRequest";

export const ACTIONS = {
  GET_PRODUCT_LIST: "GET_PRODUCTS",
  GET_PRODUCT_LIST_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCT_LIST_ERROR: "GET_PRODUCTS_ERROR",

  GET_PRODUCT_DETAIL: "GET_PRODUCT_DETAIL",
  GET_PRODUCT_DETAIL_SUCCESS: "GET_PRODUCT_DETAIL_SUCCESS",
  GET_PRODUCT_DETAIL_ERROR: "GET_PRODUCT_DETAIL_ERROR",
};

const actionsCreator = {
  getProductList: () => ({ type: ACTIONS.GET_PRODUCT_LIST }),
  getProductListSuccess: (productList) => ({
    type: ACTIONS.GET_PRODUCT_LIST_SUCCESS,
    payload: productList,
  }),
  getProductListError: (errMessage) => ({
    type: ACTIONS.GET_PRODUCT_LIST_ERROR,
    payload: errMessage,
  }),
  getProductDetail: () => ({ type: ACTIONS.GET_PRODUCT_DETAIL }),
  getProductDetailSuccess: (product) => ({
    type: ACTIONS.GET_PRODUCT_DETAIL_SUCCESS,
    payload: product,
  }),
  getProductDetailError: (errMessage) => ({
    type: ACTIONS.GET_PRODUCT_DETAIL_ERROR,
    payload: errMessage,
  }),
};

export const getProductList = () => async (dispatch, getState) => {
  if (getState()?.productList?.data) return;

  dispatch(actionsCreator.getProductList());

  try {
    const fetchedProductList = await fetchProductList();
    dispatch(actionsCreator.getProductListSuccess(fetchedProductList));
  } catch (err) {
    dispatch(actionsCreator.getProductListError(err.message));
  }
};

export const getProductDetail = (id) => async (dispatch, getState) => {
  // if (getState().productDetail.data.id === id) return;

  dispatch(actionsCreator.getProductDetail());

  try {
    const fetchedProductDetail = await fetchProductDetail(id);
    dispatch(actionsCreator.getProductDetailSuccess(fetchedProductDetail));
  } catch (err) {
    dispatch(actionsCreator.getProductDetailError(err.message));
  }
};
