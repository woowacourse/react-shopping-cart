import { API_PATH, RETURN_TYPE } from '../constants/api';
import { httpClient } from '../request/httpClient';

const FETCH_ORDER_ITEM_LIST = 'orderList/FETCH_ORDER_ITEM_LIST';

export const fetchOrderItemList = () => async (dispatch) => {
  try {
    const orderItemList = await httpClient.get({ path: API_PATH.ORDER_ITEM_LIST, returnType: RETURN_TYPE.JSON });

    dispatch({ type: FETCH_ORDER_ITEM_LIST, payload: orderItemList });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  orderItemList: [],
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: action.payload.reverse(),
      };

    default:
      return state;
  }
};

export default orderList;
