import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";

import { cartItemsState } from "../stores/cartItems";
import { MOCK_CART_LIST } from "./__mocks__/cart";

jest.mock("../apis/cart", () => ({
  getCartItems: jest.fn(),
}));

describe("cartItemsState", () => {
  beforeEach(() => {
    const { getCartItems } = require("../apis/cart");
    getCartItems.mockResolvedValue(MOCK_CART_LIST);
  });

  it("cartItemsState의 초기 값은 null이어야 한다. ", () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual(null);
  });

  test("API 요청을 통해 장바구니 항목을 가져온 후, cartItemsState의 값은 예상 데이터와 일치해야 한다.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => expect(result.current).toEqual(MOCK_CART_LIST));
  });
});
