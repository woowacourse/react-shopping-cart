import { ProductsObject } from "../reducers";

const products = {
  get: {
    request: () => ({
      type: "products/get/request",
    }),
    success: (products: ProductsObject) => ({
      type: "products/get/success",
      products,
    }),
    failure: () => ({
      type: "products/get/failure",
    }),
  },
};

export default products;
