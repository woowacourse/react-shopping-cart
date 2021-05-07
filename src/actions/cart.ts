import { ActionType, createAction } from "typesafe-actions";
import { Cart, RequestError } from "../interface";

const cart = {
  get: {
    request: createAction("cart/get/request")(),
    success: createAction("cart/get/success", (cart: Cart) => cart)<Cart>(),
    failure: createAction(
      "cart/get/failure",
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

export default cart;
export type cartActionType = ActionType<typeof cart.get>;
