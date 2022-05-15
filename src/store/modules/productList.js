import appClient from 'utils';

const GET_PRODUCT_LIST_PENDING = 'GET_PRODUCT_LIST_PENDING';
const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';
const GET_PRODUCT_LIST_FAILURE = 'GET_PRODUCT_LIST_FAILURE';

export const getProductList = () => async (dispatch) => {
  dispatch({type: GET_PRODUCT_LIST_PENDING});

  try {
    const {data} = await appClient.get('products');
    dispatch({
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_LIST_FAILURE,
      payload: err,
    });
    throw err;
  }
};

const initialState = {
  pending: false,
  error: false,
  productList: [],
};

export default function productListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case GET_PRODUCT_LIST_SUCCESS: {
      const productList = action.payload;
      return {
        ...state,
        pending: false,
        productList,
      };
    }
    case GET_PRODUCT_LIST_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
