import { ActionType, createAction } from "typesafe-actions";
import { Order, OrderList, RequestError } from "../types";

const orderListActionType = {
  get: {
    request: "orderList/post/request",
    success: "orderList/post/success",
    failure: "orderList/post/failure",
  },
  item: {
    post: {
      request: "orderList/item/post/request",
      success: "orderList/item/post/success",
      failure: "orderList/item/post/failure",
    },
  },
} as const;

const order = {
  post: {
    request: createAction(orderListActionType.item.post.request, (order: Order) => order)<Order>(),
    success: createAction(orderListActionType.item.post.success)(),
    failure: createAction(
      orderListActionType.item.post.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

const orderList = {
  get: {
    request: createAction(orderListActionType.get.request)(),
    success: createAction(orderListActionType.get.success, (orderList: OrderList) => orderList)<OrderList>(),
    failure: createAction(
      orderListActionType.get.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  item: { ...order },
};

type OrderListActionType = ActionType<typeof orderList.get | typeof order.post>;
type OrderListItemPostRequestActionType = ActionType<typeof orderList.item.post.request>;

export default orderList;
export { orderListActionType };
export { OrderListActionType, OrderListItemPostRequestActionType };
