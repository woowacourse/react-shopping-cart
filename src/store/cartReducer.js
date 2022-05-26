import { fetchData } from "../apiRequest";
import {
  API_SERVER,
  ACTION_CANCEL_MESSAGE,
  PRODUCT_QUANTITY_CONDITION,
  REQUEST_METHOD,
} from "../constants";

const cartUrl = `${API_SERVER.BASE_URL}${API_SERVER.PATH.CART}`;

const requestGetCartItemList = () => fetchData(REQUEST_METHOD.GET, cartUrl);
const requestPostCartItem = (productList) =>
  fetchData(REQUEST_METHOD.POST, cartUrl, { productList });
const requestDeleteCartItem = (productIdList) =>
  fetchData(REQUEST_METHOD.DELETE, cartUrl, { productIdList });

export const ACTIONS = {
  SET_CART_ITEM_LIST: "SET_CART_ITEM_LIST",

  GET_CART_ITEM_LIST_PENDING: "GET_CART_ITEM_LIST_PENDING",
  GET_CART_ITEM_LIST_SUCCESS: "GET_CART_ITEM_LIST_SUCCESS",
  GET_CART_ITEM_LIST_ERROR: "GET_CART_ITEM_LIST_ERROR",

  POST_CART_ITEM_PENDING: "POST_CART_ITEM_PENDING",
  POST_CART_ITEM_CANCEL: "POST_CART_ITEM_CANCEL",
  POST_CART_ITEM_SUCCESS: "POST_CART_ITEM_SUCCESS",
  POST_CART_ITEM_ERROR: "POST_CART_ITEM_ERROR",

  DELETE_CART_ITEM_PENDING: "DELETE_CART_ITEM_PENDING",
  DELETE_CART_ITEM_CANCEL: "DELETE_CART_ITEM_CANCEL",
  DELETE_CART_ITEM_SUCCESS: "DELETE_CART_ITEM_SUCCESS",
  DELETE_CART_ITEM_ERROR: "DELETE_CART_ITEM_ERROR",
};

const initialState = {
  cart: {
    data: [],
    loading: true,
    errorMessage: "",
  },
};

export const getCartItemList =
  (successMessage = "") =>
  async (dispatch) => {
    dispatch({ type: ACTIONS.GET_CART_ITEM_LIST_PENDING });

    try {
      const newCartItemList = await requestGetCartItemList();
      const payload = { newData: newCartItemList, successMessage };

      dispatch({
        type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
        payload,
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.GET_CART_ITEM_LIST_ERROR,
        payload: err.message,
      });
    }
  };

export const postCartItemByProductList =
  (productList, successMessage = "") =>
  async (dispatch) => {
    dispatch({ type: ACTIONS.POST_CART_ITEM_PENDING });

    if (productList.length === 0) {
      const payload = {
        cancelMessage: ACTION_CANCEL_MESSAGE.NO_ITEM_TO_ADD_TO_CART,
      };
      dispatch({
        type: ACTIONS.POST_CART_ITEM_CANCEL,
        payload,
      });
      return;
    }

    const hasWrongQuantity = productList.some((product) => {
      return (
        product.quantity < PRODUCT_QUANTITY_CONDITION.MIN ||
        product.quantity > PRODUCT_QUANTITY_CONDITION.MAX
      );
    });

    if (hasWrongQuantity) {
      const payload = {
        cancelMessage: ACTION_CANCEL_MESSAGE.OUT_OF_RANGE_QUANTITY,
      };
      dispatch({ type: ACTIONS.POST_CART_ITEM_CANCEL, payload });
      return;
    }

    try {
      const newCartItemList = await requestPostCartItem(productList);
      const payload = { newData: newCartItemList, successMessage };

      dispatch({
        type: ACTIONS.POST_CART_ITEM_SUCCESS,
        payload,
      });
    } catch (err) {
      dispatch({ type: ACTIONS.POST_CART_ITEM_ERROR, payload: err.message });
    }
  };

export const deleteCartItemByIdList =
  (productIdList, successMessage = "") =>
  async (dispatch) => {
    dispatch({ type: ACTIONS.DELETE_CART_ITEM_PENDING });

    if (productIdList.length === 0) {
      const payload = {
        cancelMessage: ACTION_CANCEL_MESSAGE.NO_ITEM_TO_DELETE_FROM_CART,
      };
      dispatch({ type: ACTIONS.DELETE_CART_ITEM_CANCEL, payload });
      return;
    }

    try {
      const newCartItemList = await requestDeleteCartItem(productIdList);
      const payload = { newData: newCartItemList, successMessage };

      dispatch({
        type: ACTIONS.DELETE_CART_ITEM_SUCCESS,
        payload,
      });
    } catch (err) {
      dispatch({ type: ACTIONS.DELETE_CART_ITEM_ERROR, payload: err.message });
    }
  };

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ACTIONS.SET_CART_ITEM_LIST:
      return {
        data: action.payload.newData,
      };

    case ACTIONS.GET_CART_ITEM_LIST_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case ACTIONS.GET_CART_ITEM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.newData,
      };

    case ACTIONS.GET_CART_ITEM_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case ACTIONS.POST_CART_ITEM_PENDING:
      return {
        ...state,
        errorMessage: "",
      };

    case ACTIONS.POST_CART_ITEM_CANCEL:
      if (action.payload.cancelMessage) {
        alert(action.payload.cancelMessage);
      }
      return {
        ...state,
        loading: false,
      };

    case ACTIONS.POST_CART_ITEM_SUCCESS:
      if (action.payload.successMessage) {
        alert(action.payload.successMessage);
      }
      return {
        ...state,
        loading: false,
        data: action.payload.newData,
      };

    case ACTIONS.POST_CART_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case ACTIONS.DELETE_CART_ITEM_PENDING:
      return {
        ...state,
        errorMessage: "",
      };

    case ACTIONS.DELETE_CART_ITEM_CANCEL:
      if (action.payload.cancelMessage) {
        alert(action.payload.cancelMessage);
      }
      return {
        ...state,
        loading: false,
      };

    case ACTIONS.DELETE_CART_ITEM_SUCCESS:
      if (action.payload.successMessage) {
        alert(action.payload.successMessage);
      }
      return {
        ...state,
        loading: false,
        data: action.payload.newData,
      };

    case ACTIONS.DELETE_CART_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
