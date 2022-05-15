import appClient from 'utils';

const GET_PRODUCT_ITEM_PENDING = 'GET_PRODUCT_ITEM_PENDING';
const GET_PRODUCT_ITEM_SUCCESS = 'GET_PRODUCT_ITEM_SUCCESS';
const GET_PRODUCT_ITEM_FAILURE = 'GET_PRODUCT_ITEM_FAILURE';

const getProductItem = (id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_ITEM_PENDING,
  });

  try {
    const {data} = await appClient.get(`products/${id}`);
    dispatch({
      type: GET_PRODUCT_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_ITEM_FAILURE,
      payload: error,
    });
  }
};

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export default function productItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_ITEM_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case GET_PRODUCT_ITEM_SUCCESS: {
      const productItem = action.payload;
      return {
        ...state,
        pending: false,
        data: productItem,
      };
    }
    case GET_PRODUCT_ITEM_FAILURE: {
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

export {getProductItem};
