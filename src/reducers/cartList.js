import {
  deleteBaseServerCartItem,
  getBaseServerCartList,
  patchBaseServerCartItem,
} from "util/fetch";

export const CART_LIST_ACTION = {
  GET_LIST: "cartList/GET_LIST",
  GET_LIST_SUCCESS: "cartList/GET_SUCCESS",
  GET_LIST_ERROR: "cartList/GET_ERROR",

  DELETE_LIST: "cartList/DELETE_LIST",
  DELETE_LIST_SUCCESS: "cartList/DELETE_LIST_SUCCESS",
  DELETE_LIST_ERROR: "cartList/DELETE_LIST_ERROR",

  UPDATE_ITEM_COUNT: "cartList/UPDATE_ITEM_COUNT",
  UPDATE_ITEM_COUNT_SUCCESS: "cartList/UPDATE_ITEM_COUNT_SUCCESS",
  UPDATE_ITEM_COUNT_ERROR: "cartList/UPDATE_ITEM_COUNT_ERROR",
};

const updateStoreState = async (
  fetchFunc,
  dispatch,
  { start, success, error }
) => {
  dispatch({ type: start });
  try {
    const data = await fetchFunc();

    dispatch({
      type: success,
      carts: data,
    });
  } catch (err) {
    dispatch({
      type: error,
      errorMessage: err.message,
    });
  }
};

export const getCartList = () => async (dispatch) => {
  await updateStoreState(getBaseServerCartList(), dispatch, {
    start: CART_LIST_ACTION.GET_LIST,
    success: CART_LIST_ACTION.GET_LIST_SUCCESS,
    error: CART_LIST_ACTION.GET_LIST_ERROR,
  });
};

export const deleteCartList =
  (id = "all") =>
  async (dispatch) => {
    await updateStoreState(deleteBaseServerCartItem(id), dispatch, {
      start: CART_LIST_ACTION.DELETE_LIST,
      success: CART_LIST_ACTION.DELETE_LIST_SUCCESS,
      error: CART_LIST_ACTION.DELETE_LIST_ERROR,
    });
  };

export const updateCartCount = (id, type) => async (dispatch) => {
  await updateStoreState(patchBaseServerCartItem({ type, id }), dispatch, {
    start: CART_LIST_ACTION.UPDATE_ITEM_COUNT,
    success: CART_LIST_ACTION.UPDATE_ITEM_COUNT_SUCCESS,
    error: CART_LIST_ACTION.UPDATE_ITEM_COUNT_ERROR,
  });
};

const initialState = {
  isLoading: false,
  data: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT:
    case CART_LIST_ACTION.DELETE_LIST:
      return {
        isLoading: false,
        data: state.data,
        errorMessage: "",
      };
    case CART_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: state.data,
        errorMessage: "",
      };
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT_SUCCESS:
    case CART_LIST_ACTION.DELETE_LIST_SUCCESS:
    case CART_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.carts,
        errorMessage: "",
      };
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT_ERROR:
    case CART_LIST_ACTION.DELETE_LIST_ERROR:
    case CART_LIST_ACTION.GET_LIST_ERROR:
      return {
        isLoading: false,
        data: [],
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
