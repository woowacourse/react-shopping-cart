import productsReducer, { initialState } from ".";
import { ProductsObject } from "../../interface";
import actions from "../../actions";

// TODO: 로딩에 대한 처리
describe("productReducer test", () => {
  it("should handle product/get/success", () => {
    const products: ProductsObject = {
        1: {
          name: "브랜브랜 철봉",
          price: 1000000,
          imageSrc: "www.naver.com",
        },
    };

    expect(productsReducer(initialState, actions.products.get.success(products))).toEqual({
      ...initialState,
      ...products,
    });
  });
});
