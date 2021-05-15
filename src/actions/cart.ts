import { ActionType, createAction } from "typesafe-actions";
import { Cart, CartItem, RequestError } from "../types";

const cartActionType = {
  get: {
    request: "cart/get/request",
    success: "cart/get/success",
    failure: "cart/get/failure",
  },
  post: {
    request: "cart/post/request",
    success: "cart/post/success",
    failure: "cart/post/failure",
  },
  delete: {
    request: "cart/delete/request",
    success: "cart/delete/success",
    failure: "cart/delete/failure",
  },
  animation: {
    show: "cart/animation/show",
    hide: "cart/animation/hide",
  },
} as const;

const cart = {
  get: {
    request: createAction(cartActionType.get.request)(),
    success: createAction(cartActionType.get.success, (cart: Cart) => cart)<Cart>(),
    failure: createAction(
      cartActionType.get.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  post: {
    request: createAction(cartActionType.post.request, (cartItem: CartItem) => cartItem)<CartItem>(),
    success: createAction(cartActionType.post.success)(),
    failure: createAction(
      cartActionType.post.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  delete: {
    request: createAction(cartActionType.delete.request, (ids: string[]) => ids)<string[]>(),
    success: createAction(cartActionType.delete.success)(),
    failure: createAction(
      cartActionType.delete.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
  animation: {
    show: createAction(cartActionType.animation.show)(),
    hide: createAction(cartActionType.animation.hide)(),
  },
};

type CartActionType = ActionType<typeof cart.get | typeof cart.post | typeof cart.delete | typeof cart.animation>;
type CartPostRequestActionType = ActionType<typeof cart.post.request>;
type CartDeleteRequestActionType = ActionType<typeof cart.delete.request>;

export default cart;
export { cartActionType };
export { CartActionType, CartPostRequestActionType, CartDeleteRequestActionType };
