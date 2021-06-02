import { ActionType, createAction } from "typesafe-actions";
import { CartItem, RequestError } from "../interface";

const cartActionType = {
  get: {
    request: "cart/get/request",
    success: "cart/get/success",
  },
  post: {
    request: "cart/post/request",
  },
  delete: {
    request: "cart/delete/request",
  },
} as const;

const cart = {
  get: {
    request: createAction("cart/get/request")(),
    success: createAction("cart/get/success", (cart: CartItem[]) => cart)<CartItem[]>(),
  },
  post: {
    request: createAction(cartActionType.post.request, (id: string) => id)<string>(),
  },
  delete: {
    request: createAction(cartActionType.delete.request, (ids: string[]) => ids)<string[]>(),
  },
};

type CartActionType = ActionType<typeof cart.get | typeof cart.post | typeof cart.delete>;
type CartPostRequestActionType = ActionType<typeof cart.post.request>;
type CartDeleteRequestActionType = ActionType<typeof cart.delete.request>;

export default cart;
export { cartActionType };
export { CartActionType, CartPostRequestActionType, CartDeleteRequestActionType };
