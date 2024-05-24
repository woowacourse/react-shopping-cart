import { renderHook } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useCouponApplicabilityChecker } from "../../../src/hooks/coupons";
import { mockCoupons } from "../../../src/mocks";
import { couponsState } from "../../../src/recoil/atoms";

describe("useCouponApplicabilityChecker 테스트", () => {
  it("주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[0], 50000)).toBe(
      false
    );
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[2], 60000)).toBe(true);
  });
});
