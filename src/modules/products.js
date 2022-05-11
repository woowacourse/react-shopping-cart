import * as productAPI from "../api";

const GET_PROUDCTS = "products/GET_PRODUCTS";

const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";

export const getProduct = () => async (dispatch) => {
  dispatch({ type: GET_PROUDCTS });

  try {
    const products = await productAPI.getProducts();
    dispatch({ type: GET_PRODUCTS_SUCCESS, products: products.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

const initialState = {
  products: {
    loading: false,
    data: [],
    error: null,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROUDCTS:
      return {
        ...state,
        products: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          loading: false,
          data: action.products,
          error: null,
        },
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
