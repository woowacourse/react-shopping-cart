import { act } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import { isCartItemsSelectedState } from "../stores/cartItemSelections";
import { MOCK_CART_LIST } from "./__mocks__/cart";
import { CART_PRICE } from "../constants/cart";
import { cartPriceState } from "../stores/cartPrice";

jest.mock("../apis/cart", () => ({
  getCartItems: jest.fn(),
}));

describe("CartItem Selections", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("상품을 선택하면 체크 상태 값이 변경된다. ", () => {
    const { result } = renderHook(
      () => useRecoilState(isCartItemsSelectedState(1274)),
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]((prev) => !prev);
    });

    expect(result.current[0]).toBe(true);
  });
});
