import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../constants";

const PRODUCT_LIST_ACTION = {
  GET_LIST: "productList/GET_LIST",
  GET_LIST_SUCCESS: "productList/GET_SUCCESS",
  GET_LIST_ERROR: "productList/GET_ERROR",
};

export const getProductList = () => async (dispatch) => {
  const productListURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`;

  dispatch({ type: PRODUCT_LIST_ACTION.GET_LIST });
  try {
    const response = await fetch(productListURL);

    if (!response.ok) {
      throw new Error(`fetch error`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`No Data`);
    }

    dispatch({
      type: PRODUCT_LIST_ACTION.GET_LIST_SUCCESS,
      products: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ACTION.GET_LIST_ERROR, errorMessage: error });
  }
};

const initialState = {
  isLoading: false,
  data: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: [],
        errorMessage: "",
      };
    case PRODUCT_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.products,
        errorMessage: "",
      };
    case PRODUCT_LIST_ACTION.GET_LIST_ERROR:
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
