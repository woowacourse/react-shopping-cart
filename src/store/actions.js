import {
  requestGetCartItemList,
  requestDeleteCartItem,
  requestPostCartItem,
} from "../apiRequest";

import {
  ERROR_MESSAGE,
  PRODUCT_QUANTITY_CONDITION,
} from "./../constants/index";

export const ACTIONS = {
  GET_CART_ITEM_LIST_PENDING: "GET_CART_ITEM_LIST_PENDING",
  GET_CART_ITEM_LIST_SUCCESS: "GET_CART_ITEM_LIST_SUCCESS",
  GET_CART_ITEM_LIST_ERROR: "GET_CART_ITEM_LIST_ERROR",

  POST_CART_ITEM_PENDING: "POST_CART_ITEM_PENDING",
  POST_CART_ITEM_CANCEL: "POST_CART_ITEM_CANCEL",
  POST_CART_ITEM_SUCCESS: "POST_CART_ITEM_SUCCESS",
  POST_CART_ITEM_ERROR: "POST_CART_ITEM_ERROR",

  DELETE_CART_ITEM_PENDING: "DELETE_CART_ITEM_PENDING",
  DELETE_CART_ITEM_SUCCESS: "DELETE_CART_ITEM_SUCCESS",
  DELETE_CART_ITEM_ERROR: "DELETE_CART_ITEM_ERROR",
};

export const getCartItemList = () => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.GET_CART_ITEM_LIST_PENDING });

  try {
    const fetchedCartItemList = await requestGetCartItemList();
    dispatch({
      type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
      payload: fetchedCartItemList,
    });
  } catch (err) {
    dispatch({ type: ACTIONS.GET_CART_ITEM_LIST_ERROR, payload: err.message });
  }
};

export const postCartItem =
  (productList, successMessage) => async (dispatch) => {
    dispatch({ type: ACTIONS.POST_CART_ITEM_PENDING });

    if (productList.length === 0) {
      alert(ERROR_MESSAGE.NO_ITEM_TO_ADD_TO_CART);
      dispatch({ type: ACTIONS.POST_CART_ITEM_CANCEL });
      return;
    }

    const hasWrongQuantity = productList.some((product) => {
      return (
        product.quantity < PRODUCT_QUANTITY_CONDITION.MIN ||
        product.quantity > PRODUCT_QUANTITY_CONDITION.MAX
      );
    });

    if (hasWrongQuantity) {
      alert(ERROR_MESSAGE.OUT_OF_RANGE_QUANTITY);
      dispatch({ type: ACTIONS.POST_CART_ITEM_CANCEL });
      return;
    }

    try {
      const newCartItemList = await requestPostCartItem(productList);
      dispatch({
        type: ACTIONS.POST_CART_ITEM_SUCCESS,
        payload: newCartItemList,
      });
      successMessage && alert(successMessage);
    } catch (err) {
      dispatch({ type: ACTIONS.POST_CART_ITEM_ERROR, payload: err.message });
    }
  };

export const deleteCartItem =
  (productIdList, successMessage) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.DELETE_CART_ITEM_PENDING });

    try {
      const newCartItemList = await requestDeleteCartItem(productIdList);
      dispatch({
        type: ACTIONS.DELETE_CART_ITEM_SUCCESS,
        payload: newCartItemList,
      });
      successMessage && alert(successMessage);
    } catch (err) {
      dispatch({ type: ACTIONS.DELETE_CART_ITEM_ERROR, payload: err.message });
    }
  };
