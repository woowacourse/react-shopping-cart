import { Order } from "../../interface";
import { OrderListActionType, orderListActionType } from "../../actions/orderList";

const initialState: Order[] = [];

const orderListReducer = (state: Order[] = initialState, action: OrderListActionType) => {
  switch (action.type) {
    case orderListActionType.get.success:
      return action.payload;
    default:
      return state;
  }
};

export default orderListReducer;
export { initialState };
