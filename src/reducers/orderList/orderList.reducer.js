import { actionTypes } from 'reducers/orderList/orderList.actions';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const orderListReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_ORDER_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === actionTypes.GET_ORDER_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_ORDER_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default orderListReducer;
