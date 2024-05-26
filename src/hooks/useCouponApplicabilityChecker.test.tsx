import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { mockCouponData } from "../mocks/mockCouponData";
import { couponsState } from "../recoil/atoms/atoms";
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";

describe("useCouponApplicabilityChecker", () => {
  it("주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가하다", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCouponData[0], 50000)).toBe(false);
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능하다", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCouponData[2], 60000)).toBe(true);
  });
});
