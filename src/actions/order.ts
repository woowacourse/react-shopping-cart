import { createAction } from "typesafe-actions";
import { Order } from "../interface";

const order = {
  post: {
    request: createAction(
      "order/post/request",
      (order: Order) => order
    )<Order>(),
  },
};

export default order;
