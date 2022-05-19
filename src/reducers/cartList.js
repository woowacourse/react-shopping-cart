import { BASE_SERVER_URL, SERVER_PATH } from "../constants";

const CART_LIST_ACTION = {
  GET_LIST: "cartList/GET_LIST",
  GET_LIST_SUCCESS: "cartList/GET_SUCCESS",
  GET_LIST_ERROR: "cartList/GET_ERROR",
};

export const getCartList = (idList) => () => async (dispatch) => {
  const cartListUrl = `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}/?idList=${idList}`;

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
      products: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_ACTION.GET_LIST_ERROR,
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
    case CART_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: [],
        errorMessage: "",
      };
    case CART_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.products,
        errorMessage: "",
      };
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
