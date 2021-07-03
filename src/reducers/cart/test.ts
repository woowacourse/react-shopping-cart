import cartReducer, { initialState } from ".";
import actions from "../../actions";
import { Cart, CartItem } from "../../interface";

describe("cartReducer test", () => {
  it("should handle cart/get/success", () => {
    const cart: CartItem[] = [
      {
        id: "1",
        name: "브랜브랜철봉",
        price: 100000,
        imageSrc: "urlrul",
        quantity: 2,
      },
      {
        id: "2",
        name: "브랜브랜철봉2",
        price: 100000,
        imageSrc: "urlrul",
        quantity: 2,
      },
    ];

    expect(cartReducer(initialState, actions.cart.get.success(cart))).toEqual(cart);
  });
});
