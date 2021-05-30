import productsReducer, { initialState } from ".";
import { Product } from "../../types";
import actions from "../../actions";

// TODO: 로딩에 대한 처리
describe("productReducer test", () => {
  it("should handle product/get/success", () => {
    const products: Product[] = [
      {
        product_id: "1",
        name: "브랜브랜 철봉",
        price: 1000000,
        image_url: "www.naver.com",
      },
    ];

    expect(productsReducer(initialState, actions.products.get.success(products))).toEqual({
      ...initialState,
      products,
    });
  });

  it("should handle product/get/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(productsReducer(initialState, actions.products.get.failure(requestErrorMessage))).toEqual({
      ...initialState,
      ...requestErrorMessage,
    });
  });
});
