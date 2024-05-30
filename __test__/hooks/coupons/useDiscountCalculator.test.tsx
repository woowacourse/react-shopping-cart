import { renderHook } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useCartCalculator } from "../../../src/hooks/coupons";
import { mockCartItems, mockCoupons } from "../../../src/mocks";
import { cartListState, couponsState } from "../../../src/recoil/atoms";

describe("useCartCalculator", () => {
  it("쿠폰 할인이 적용된 최종 결제 금액을 계산할 수 있다", () => {
    const { result } = renderHook(() => useCartCalculator(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartListState, mockCartItems.content);
            set(couponsState, mockCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.calculateTotalWithCoupon("FIXED5000")).toBe(95000);
  });
});
