import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";

import { cartItemsState } from "../stores/cartItems";

import { MOCK_CART_LIST } from "./__mocks__/cart";

jest.mock("@/apis/cartItem", () => ({
  getCartItems: jest.fn(),
}));

describe("cartItems state 테스트", () => {
  it("장바구니 목록을 반환한다", () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, MOCK_CART_LIST)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current).toBeDefined();
    expect(result.current).toEqual(MOCK_CART_LIST);
  });
});
