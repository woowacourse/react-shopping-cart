import cartReducer, { initialState } from ".";
import actions from "../../actions";
import { CartItem } from "../../types";

describe("cartReducer test", () => {
  it("should handle cart/get/success", () => {
    const cart: CartItem[] = [{ cartId: "1", name: "강릉초당인절미순두부아이스크림", price: 2500, imageUrl: "" }];

    expect(cartReducer(initialState, actions.cart.get.success(cart))).toEqual({
      ...initialState,
      cart,
    });
  });

  it("should handle cart/get/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(cartReducer(initialState, actions.cart.get.failure(requestErrorMessage))).toEqual({
      ...initialState,
      ...requestErrorMessage,
    });
  });

  it("should handle cart/post/success", () => {
    expect(cartReducer(initialState, actions.cart.post.success())).toEqual({
      ...initialState,
    });
  });

  it("should handle cart/post/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(cartReducer(initialState, actions.cart.post.failure(requestErrorMessage))).toEqual({
      ...initialState,
      ...requestErrorMessage,
    });
  });
});
