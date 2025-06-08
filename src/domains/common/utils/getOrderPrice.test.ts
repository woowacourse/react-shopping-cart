import { mockShoppingCartResponse } from "../../shopping-cart/mocks/mockShoppingCartResponse";
import { getOrderPrice } from "./getOrderPrice";

describe("getOrderPrice 함수 동작을 검증한다", () => {
  it.each([
    [["7124", "7161", "7457"], 114800],
    [["7124", "7161"], 14800],
    [["7457"], 100000],
  ])(
    "선택된 장바구니 아이템에 따라 총 금액을 계산할 수 있다,",
    (selectedCartIds, totalPrice) => {
      expect(
        getOrderPrice({
          cartItems: mockShoppingCartResponse.content,
          selectedCartIds,
        })
      ).toBe(totalPrice);
    }
  );
});
