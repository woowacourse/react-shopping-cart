import { OrderList, RequestError } from "../../interface";
import { orderListActionType } from "../../actions/orderList";

const initialState: OrderList & RequestError = {
  orderList: [],
  requestErrorMessage: null,
};

const orderListReducer = (
  state: OrderList & RequestError = initialState,
  action: orderListActionType
) => {
  switch (action.type) {
    case "orderList/get/success":
      return {
        ...state,
        orderList: [...action.payload.orderList],
        requestErrorMessage: null,
      };

    case "orderList/get/failure":
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
