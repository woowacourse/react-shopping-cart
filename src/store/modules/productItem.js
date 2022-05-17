import appClient from 'utils';

const ACTION = {
  PRODUCT_ITEM_PENDING: 'PRODUCT_ITEM_PENDING',
  PRODUCT_ITEM_SUCCESS: 'PRODUCT_ITEM_SUCCESS',
  PRODUCT_ITEM_FAILURE: 'PRODUCT_ITEM_FAILURE',
};

const getProductItem = (id) => async (dispatch) => {
  dispatch({
    type: ACTION.PRODUCT_ITEM_PENDING,
  });

  try {
    const {data} = await appClient.get(`products/${id}`);
    dispatch({
      type: ACTION.PRODUCT_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION.PRODUCT_ITEM_FAILURE,
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
    case ACTION.PRODUCT_ITEM_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.PRODUCT_ITEM_SUCCESS: {
      const productItem = action.payload;
      return {
        ...state,
        pending: false,
        data: productItem,
      };
    }
    case ACTION.PRODUCT_ITEM_FAILURE: {
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
