import { OrderList, RequestError } from '../../interface';
import { orderListActionType } from '../../actions/orderList';

const initialState: OrderList & RequestError = {
  orderList: [],
  requestErrorMessage: null,
};

const orderListReducer = (
  state: OrderList & RequestError = initialState,
  action: orderListActionType
) => {
  switch (action.type) {
    case 'orderList/get/success':
      return {
        ...state,
        orderList: [...action.payload.orderList],
        requestErrorMessage: null,
      };

    case 'orderList/get/failure':
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    // TODO: orderList안에 order액션 처리를 위한 네이밍?
    case 'orderList/item/post/success':
      return {
        ...state,
        requestErrorMessage: null,
      };

    case 'orderList/item/post/failure':
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default orderListReducer;
export { initialState };
