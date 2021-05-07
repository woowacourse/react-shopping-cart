import cartReducer, { initialState } from ".";
import actions from "../../actions";
import { Cart } from "../../interface";
import productsReducer from "../products";

describe("cartReducer test", () => {
  it("should handle cart/get/success", () => {
    const cart: Cart = { cart: [{ id: "1", quantity: 3, isSelected: true }] };

    expect(cartReducer(initialState, actions.cart.get.success(cart))).toEqual({
      ...initialState,
      ...cart,
      requestErrorMessage: null,
    });
  });

  it("should handle cart/get/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(
      cartReducer(initialState, actions.cart.get.failure(requestErrorMessage))
    ).toEqual({ ...initialState, ...requestErrorMessage });
  });
});
