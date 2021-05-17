import { Product, RequestError } from "../types";
import { createAction, ActionType } from "typesafe-actions";

const productsActionType = {
  get: {
    request: "products/get/request",
    success: "products/get/success",
    failure: "products/get/failure",
  },
} as const;

const products = {
  get: {
    request: createAction(productsActionType.get.request, (product_id: string = "") => product_id)<string>(),
    success: createAction(productsActionType.get.success, (products: Product[]) => products)<Product[]>(),
    failure: createAction(
      productsActionType.get.failure,
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

type ProductsActionType = ActionType<typeof products.get>;

export default products;
export { productsActionType };
export { ProductsActionType };
