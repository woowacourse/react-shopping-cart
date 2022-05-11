import * as productAPI from "../api";

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";

const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";

const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";
const GET_PROUDCTS_END = "products/GET_PRODUCTS_END";

export const getProduct = () => async (dispatch, getState) => {
  dispatch({ type: GET_PRODUCTS });

  try {
    const products = await productAPI.getProductsByPage(
      getState().products.page
    );

    if (products.data.length < 10) {
      return dispatch({ type: GET_PROUDCTS_END, products: products.data });
    }
    dispatch({ type: GET_PRODUCTS_SUCCESS, products: products.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });

  try {
    const product = await productAPI.getProductById(id);
    dispatch({ type: GET_PRODUCT_SUCCESS, product: product.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error });
  }
};

const initialState = {
  product: {
    loading: false,
    data: {},
    error: null,
  },
  products: {
    loading: false,
    data: [],
    error: null,
    isEnd: false,
    page: 1,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          loading: false,
          data: state.products.data.concat(action.products),
          error: null,
          isEnd: false,
          page: state.products.page + 1,
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
    case GET_PROUDCTS_END:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.concat(action.products),
          loading: false,
          isEnd: true,
        },
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: {
          loading: true,
          data: {},
          error: null,
        },
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: {
          loading: false,
          data: action.product,
          error: null,
        },
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        product: {
          loading: false,
          data: {},
          error: null,
        },
      };
    default:
      return state;
  }
}
