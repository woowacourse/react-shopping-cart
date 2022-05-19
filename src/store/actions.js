import {
  fetchCartItemList,
  fetchProductDetail,
  fetchProductList,
  requestDeleteCartItem,
  requestPostCartItem,
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

  POST_CART_ITEM: "POST_CART_ITEM",
  POST_CART_ITEM_SUCCESS: "POST_CART_ITEM_SUCCESS",
  POST_CART_ITEM_ERROR: "POST_CART_ITEM_ERROR",

  DELETE_CART_ITEM: "DELETE_CART_ITEM",
  DELETE_CART_ITEM_SUCCESS: "DELETE_CART_ITEM_SUCCESS",
  DELETE_CART_ITEM_ERROR: "DELETE_CART_ITEM_ERROR",
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
  getCartItemListSuccess: (cartItemList) => ({
    type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
    payload: cartItemList,
  }),
  getCartItemListError: (errMessage) => ({
    type: ACTIONS.GET_CART_ITEM_LIST_ERROR,
    payload: errMessage,
  }),

  postCartItem: () => ({ type: ACTIONS.POST_CART_ITEM }),
  postCartItemSuccess: (cartItem) => ({
    type: ACTIONS.POST_CART_ITEM_SUCCESS,
    payload: cartItem,
  }),
  postCartItemError: (errMessage) => ({
    type: ACTIONS.POST_CART_ITEM_ERROR,
    payload: errMessage,
  }),

  deleteCartItem: () => ({ type: ACTIONS.DELETE_CART_ITEM }),
  deleteCartItemSuccess: (cartItem) => ({
    type: ACTIONS.DELETE_CART_ITEM_SUCCESS,
    payload: cartItem,
  }),
  deleteCartItemError: (errMessage) => ({
    type: ACTIONS.DELETE_CART_ITEM_ERROR,
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

export const postCartItem = (productList) => async (dispatch, getState) => {
  dispatch(actionsCreator.postCartItem());

  try {
    const newCartItemList = await requestPostCartItem(productList);
    dispatch(actionsCreator.postCartItemSuccess(newCartItemList));
  } catch (err) {
    dispatch(actionsCreator.postCartItemSuccess(err.message));
  }
};

export const deleteCartItem = (productIdList) => async (dispatch, getState) => {
  dispatch(actionsCreator.deleteCartItem());

  try {
    const newCartItemList = await requestDeleteCartItem(productIdList);
    dispatch(actionsCreator.deleteCartItemSuccess(newCartItemList));
  } catch (err) {
    dispatch(actionsCreator.deleteCartItemError(err.message));
  }
};
