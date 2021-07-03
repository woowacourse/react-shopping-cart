import { ActionType, createAction } from "typesafe-actions";
import { Order, OrderRequest } from "../interface";

const orderListActionType = {
  get: {
    request: "orderList/get/request",
    success: "orderList/get/success",
  },
  item: {
    post: {
      request: "orderList/post/request",
    },
  },
} as const;

const orderList = {
  get: {
    request: createAction(orderListActionType.get.request)(),
    success: createAction(orderListActionType.get.success, (orderList: Order[]) => orderList)<Order[]>(),
  },
  post: {
    request: createAction(orderListActionType.item.post.request, (orderRequests: OrderRequest[]) => orderRequests)<
      OrderRequest[]
    >(),
  },
};

type OrderListActionType = ActionType<typeof orderList.get | typeof orderList.post>;
type OrderListItemPostRequestActionType = ActionType<typeof orderList.post.request>;

export default orderList;
export { orderListActionType };
export { OrderListActionType, OrderListItemPostRequestActionType };
