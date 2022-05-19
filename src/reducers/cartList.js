import { BASE_SERVER_URL, SERVER_PATH } from "../constants";

const CART_LIST_ACTION = {
  GET_LIST: "cartList/GET_LIST",
  GET_LIST_SUCCESS: "cartList/GET_SUCCESS",
  GET_LIST_ERROR: "cartList/GET_ERROR",
  DELETE_LIST: "cartList/DELETE_LIST",
  DELETE_LIST_SUCCESS: "cartList/DELETE_LIST_SUCCESS",
  DELETE_LIST_ERROR: "cartList/DELETE_LIST_ERROR",
};

export const getCartList = () => async (dispatch) => {
  const cartListUrl = `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`;

  dispatch({ type: CART_LIST_ACTION.GET_LIST });
  try {
    const response = await fetch(`${cartListUrl}`);

    if (!response.ok) {
      throw new Error(`fetch error`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`No Data`);
    }

    dispatch({
      type: CART_LIST_ACTION.GET_LIST_SUCCESS,
      carts: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_ACTION.GET_LIST_ERROR,
      errorMessage: error.message,
    });
  }
};

export const deleteCartList =
  (id = "all") =>
  async (dispatch) => {
    const cartListUrl = `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}/${id}`;

    dispatch({ type: CART_LIST_ACTION.DELETE_LIST });
    try {
      const response = await fetch(cartListUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`fetch error`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error(`No Data`);
      }

      dispatch({
        type: CART_LIST_ACTION.DELETE_LIST_SUCCESS,
        carts: data,
      });
    } catch (error) {
      dispatch({
        type: CART_LIST_ACTION.DELETE_LIST_ERROR,
        errorMessage: error.message,
      });
    }
  };

const initialState = {
  isLoading: false,
  data: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LIST_ACTION.DELETE_LIST:
    case CART_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: [],
        errorMessage: "",
      };
    case CART_LIST_ACTION.DELETE_LIST_SUCCESS:
    case CART_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.carts,
        errorMessage: "",
      };
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
