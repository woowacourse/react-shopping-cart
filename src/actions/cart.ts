import { ActionType, createAction } from "typesafe-actions";
import { Cart, CartItem, RequestError } from "../interface";

const cart = {
  get: {
    request: createAction("cart/get/request")(),
    success: createAction("cart/get/success", (cart: Cart) => cart)<Cart>(),
    failure: createAction(
      "cart/get/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  post: {
    request: createAction(
      "cart/post/request",
      (cartItem: CartItem) => cartItem
    )<CartItem>(),
    success: createAction("cart/post/success")(),
    failure: createAction(
      "cart/post/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  delete: {
    request: createAction("cart/delete/request", (id: string) => id)<string>(),
    success: createAction("cart/delete/success")(),
    failure: createAction(
      "cart/delete/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

type cartActionType = ActionType<
  typeof cart.get | typeof cart.post | typeof cart.delete
>;
type cartPostRequestActionType = ActionType<typeof cart.post.request>;
type cartDeleteRequestActionType = ActionType<typeof cart.delete.request>;

export default cart;
export {
  cartActionType,
  cartPostRequestActionType,
  cartDeleteRequestActionType,
};
