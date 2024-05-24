import { renderHook } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useCoupons } from "../../../src/hooks/coupons/index";
import { mockCoupons } from "../../../src/mocks/index";
import { couponsState } from "../../../src/recoil/atoms";

describe("useCoupons 테스트", () => {
  it("쿠폰 목록을 반환한다", () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.coupons).toBeDefined();
    expect(result.current.coupons.length).toBe(4);
  });
});
