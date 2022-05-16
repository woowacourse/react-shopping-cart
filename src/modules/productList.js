const GET_PRODUCT_LIST = 'productList/GET_PRODUCT_LIST';
const GET_PRODUCT_LIST_SUCCESS = 'productList/GET_PRODUCT_LIST_SUCCESS';
const GET_PRODUCT_LIST_ERROR = 'productList/GET_PRODUCT_LIST_ERROR';

export const getProductList = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LIST });
  try {
    const response = await loadProductList();
    if (!response.ok) {
      throw new Error(response);
    }
    const productList = await response.json();
    dispatch({ type: GET_PRODUCT_LIST_SUCCESS, productList });
  } catch (e) {
    dispatch({ type: GET_PRODUCT_LIST_ERROR, error: e });
  }
};

const initialState = {
  posts: {
    loading: false,
    productList: [],
    error: null,
  },
};

const productListReducer = (state = initialState, action) => {
  if (action.type === GET_PRODUCT_LIST) {
    return {
      ...state,
      posts: {
        loading: true,
        productList: [],
        error: null,
      },
    };
  }
  if (action.type === GET_PRODUCT_LIST_SUCCESS) {
    return {
      ...state,
      posts: {
        loading: false,
        productList: action.productList,
        error: null,
      },
    };
  }
  if (action.type === GET_PRODUCT_LIST_ERROR) {
    return {
      ...state,
      posts: {
        loading: true,
        productList: [],
        error: action.error,
      },
    };
  }
  return state;
};

export const loadProductList = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export default productListReducer;
