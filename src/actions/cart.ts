import { ActionType, createAction } from "typesafe-actions";
import { Id, Cart, CartItem, RequestError } from "../interface";

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
      (productId: Id) => productId
    )<Id>(),
    success: createAction("cart/post/success")(),
    failure: createAction(
      "cart/post/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

type cartActionType = ActionType<typeof cart.get | typeof cart.post>;
type cartPostActionType = ActionType<typeof cart.post>;

export default cart;
export { cartActionType, cartPostActionType };
