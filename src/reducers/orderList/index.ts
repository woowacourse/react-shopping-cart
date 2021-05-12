import { OrderList, RequestError } from "../../interface";
import { OrderListActionType, orderListActionType } from "../../actions/orderList";

const initialState: OrderList & RequestError = {
  orderList: [],
  requestErrorMessage: null,
};

const orderListReducer = (state: OrderList & RequestError = initialState, action: OrderListActionType) => {
  switch (action.type) {
    case orderListActionType.get.success:
      return {
        ...state,
        orderList: [...action.payload.orderList],
        requestErrorMessage: null,
      };

    case orderListActionType.get.failure:
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case orderListActionType.item.post.success:
      return {
        ...state,
        requestErrorMessage: null,
      };

    case orderListActionType.item.post.failure:
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
