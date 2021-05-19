import { ProductsObject, RequestError } from "../interface";
import { createAction, ActionType } from "typesafe-actions";

const productsActionType = {
  get: {
    request: "products/get/request",
    success: "products/get/success",
  },
} as const;

const products = {
  get: {
    request: createAction(productsActionType.get.request)(),
    success: createAction(productsActionType.get.success, (products: ProductsObject) => products)<ProductsObject>(),
  },
};

type ProductsActionType = ActionType<typeof products.get>;

export default products;
export { productsActionType };
export { ProductsActionType };
