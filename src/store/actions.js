import {
  fetchCartItemList,
  fetchProductDetail,
  fetchProductList,
} from "../apiRequest";

export const ACTIONS = {
  GET_PRODUCT_LIST: "GET_PRODUCT_LIST",
  GET_PRODUCT_LIST_SUCCESS: "GET_PRODUCT_LIST_SUCCESS",
  GET_PRODUCT_LIST_ERROR: "GET_PRODUCT_LIST_ERROR",

  GET_PRODUCT_DETAIL: "GET_PRODUCT_DETAIL",
  GET_PRODUCT_DETAIL_SUCCESS: "GET_PRODUCT_DETAIL_SUCCESS",
  GET_PRODUCT_DETAIL_ERROR: "GET_PRODUCT_DETAIL_ERROR",

  GET_CART_ITEM_LIST: "GET_CART_ITEM_LIST",
  GET_CART_ITEM_LIST_SUCCESS: "GET_CART_ITEM_LIST_SUCCESS",
  GET_CART_ITEM_LIST_ERROR: "GET_CART_ITEM_LIST_ERROR",
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

  getCartItemList: () => ({ type: ACTIONS.GET_CART_ITEM_LIST }),
  getCartItemListSuccess: (product) => ({
    type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
    payload: product,
  }),
  getCartItemListError: (errMessage) => ({
    type: ACTIONS.GET_CART_ITEM_LIST_ERROR,
    payload: errMessage,
  }),
};

export const getProductList = () => async (dispatch, getState) => {
  dispatch(actionsCreator.getProductList());

  try {
    const fetchedProductList = await fetchProductList();
    dispatch(actionsCreator.getProductListSuccess(fetchedProductList));
  } catch (err) {
    dispatch(actionsCreator.getProductListError(err.message));
  }
};

export const getProductDetail = (id) => async (dispatch, getState) => {
  dispatch(actionsCreator.getProductDetail());

  try {
    const fetchedProductDetail = await fetchProductDetail(id);
    dispatch(actionsCreator.getProductDetailSuccess(fetchedProductDetail));
  } catch (err) {
    dispatch(actionsCreator.getProductDetailError(err.message));
  }
};

export const getCartItemList = () => async (dispatch, getState) => {
  dispatch(actionsCreator.getCartItemList());

  try {
    const fetchedCartItemList = await fetchCartItemList();
    dispatch(actionsCreator.getCartItemListSuccess(fetchedCartItemList));
  } catch (err) {
    dispatch(actionsCreator.getCartItemListError(err.message));
  }
};
