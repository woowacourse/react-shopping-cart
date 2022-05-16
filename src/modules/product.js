const GET_PRODUCT = 'productItem/GET_PRODUCT_ITEM';
const GET_PRODUCT_SUCCESS = 'productItem/GET_PRODUCT_ITEM_SUCCESS';
const GET_PRODUCT_ERROR = 'productItem/GET_PRODUCT_ITEM_ERROR';

export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });
  try {
    const response = await loadProductItem(id);
    if (!response.ok) {
      throw new Error(response);
    }
    const product = await response.json();
    dispatch({ type: GET_PRODUCT_SUCCESS, product });
  } catch (e) {
    dispatch({ type: GET_PRODUCT_ERROR, error: e });
  }
};
const initialState = {
  posts: {
    loading: false,
    product: null,
    error: null,
  },
};

const productReducer = (state = initialState, action) => {
  if (action.type === GET_PRODUCT) {
    return {
      ...state,
      posts: {
        loading: true,
        product: null,
        error: null,
      },
    };
  }
  if (action.type === GET_PRODUCT_SUCCESS) {
    return {
      ...state,
      posts: {
        loading: false,
        product: action.product,
        error: null,
      },
    };
  }
  if (action.type === GET_PRODUCT_ERROR) {
    return {
      ...state,
      posts: {
        loading: false,
        product: null,
        error: action.error,
      },
    };
  }
  return state;
};

const loadProductItem = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productList/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export default productReducer;
