import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { mockCouponData } from "../mocks/mockCouponData";
import { couponsState } from "../recoil/atoms/atoms";
import { useFetchCoupons } from "./useFetchCoupons";

describe("useFetchCoupons", () => {
  it("쿠폰 목록을 반환한다", () => {
    const { result } = renderHook(() => useFetchCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBeDefined();
    expect(result.current.length).toBe(4);
  });
});
