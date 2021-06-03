import { ActionType, createAction } from "typesafe-actions";
import { Order, OrderList, RequestError } from "../interface";

const orderListActionType = {
  get: {
    request: "orderList/item/post/request",
    success: "orderList/item/post/success",
  },
  item: {
    post: {
      request: "orderList/get/request",
    },
  },
} as const;

const orderList = {
  get: {
    request: createAction(orderListActionType.get.request)(),
    success: createAction(orderListActionType.get.success, (orderList: Order[]) => orderList)<Order[]>(),
  },
  post: {
    request: createAction(orderListActionType.item.post.request, (id:string, quantity: number) => ({id, quantity}))<{id: string, quantity: number}>(),
  },
};

type OrderListActionType = ActionType<typeof orderList.get | typeof orderList.post>;
type OrderListItemPostRequestActionType = ActionType<typeof orderList.post.request>;

export default orderList;
export { orderListActionType };
export { OrderListActionType, OrderListItemPostRequestActionType };
