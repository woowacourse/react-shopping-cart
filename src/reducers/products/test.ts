import { hasUncaughtExceptionCaptureCallback } from "node:process";
import productsReducer from ".";
import { ProductsObject } from "..";
import actions from "../../actions";

describe("productReducer test", () => {
  it("should handle product/get/success", () => {
    const mock: ProductsObject = {
      1: {
        name: "브랜브랜 철봉",
        price: 1000000,
      },
    };

    expect(productsReducer({}, actions.products.get.success(mock))).toEqual(
      mock
    );
  });
});
