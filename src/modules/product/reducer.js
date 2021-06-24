import { LOADING, FAILURE, SUCCESS } from '../../constants/status';
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCESS } from './actions';

const initialState = {
  products: {
    status: null,
    data: [],
    error: null,
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LOADING:
      return {
        ...state,
        products: {
          status: LOADING,
          data: [],
          error: null,
        },
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: {
          status: FAILURE,
          data: [],
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default productReducer;
