import { ActionType, createAction } from "typesafe-actions";
import { Order, OrderList, RequestError } from "../interface";

const order = {
  post: {
    request: createAction("orderList/item/post/request", (order: Order) => order)<Order>(),
    success: createAction("orderList/item/post/success")(),
    failure: createAction(
      "orderList/item/post/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

const orderList = {
  get: {
    request: createAction("orderList/get/request")(),
    success: createAction("orderList/get/success", (orderList: OrderList) => orderList)<OrderList>(),
    failure: createAction(
      "orderList/get/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  item: { ...order },
};

type orderListActionType = ActionType<typeof orderList.get | typeof order.post>;
type orderListItemPostRequestActionType = ActionType<typeof orderList.item.post.request>;

export default orderList;
export { orderListActionType, orderListItemPostRequestActionType };
