import appClient from 'utils';

const ACTION = {
  PRODUCT_LIST_PENDING: 'PRODUCT_LIST_PENDING',
  PRODUCT_LIST_SUCCESS: 'PRODUCT_LIST_SUCCESS',
  PRODUCT_LIST_FAILURE: 'PRODUCT_LIST_FAILURE',
};

export const getProductList = () => async (dispatch) => {
  dispatch({type: ACTION.PRODUCT_LIST_PENDING});

  try {
    const {data} = await appClient.get('/products');
    dispatch({
      type: ACTION.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ACTION.PRODUCT_LIST_FAILURE,
      payload: err,
    });
    throw err;
  }
};

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export default function productListReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.PRODUCT_LIST_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.PRODUCT_LIST_SUCCESS: {
      const productList = action.payload;
      return {
        ...state,
        pending: false,
        data: productList,
      };
    }
    case ACTION.PRODUCT_LIST_FAILURE: {
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
