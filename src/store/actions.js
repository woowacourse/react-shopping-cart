import {
  requestGetCartItemList,
  requestDeleteCartItem,
  requestPostCartItem,
} from "../apiRequest";

export const ACTIONS = {
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

export const getCartItemList = () => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.GET_CART_ITEM_LIST });

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
  (productList, successMessage) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.POST_CART_ITEM });

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
    dispatch({ type: ACTIONS.DELETE_CART_ITEM });

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
