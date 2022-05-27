export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_ERROR = 'GET_ORDER_LIST_ERROR';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const orderListReducer = (state = initialState, action) => {
  if (action.type === GET_ORDER_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_ORDER_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === GET_ORDER_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default orderListReducer;
