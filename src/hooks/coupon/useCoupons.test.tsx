import { renderHook, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import useCoupons from "@/hooks/coupon/useCoupons";
import { mockCoupons } from "@/mocks/coupons";
import { couponsState } from "@/recoil/coupons";

describe("쿠폰 적용 테스트", () => {
  it("쿠폰이 잘 적용된다.", () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, [mockCoupons[0]])}
        >
          {children}
        </RecoilRoot>
      ),
    });
    act(() => result.current.applyCoupon(mockCoupons[2]));

    expect(result.current.couponList).toEqual([mockCoupons[0], mockCoupons[2]]);
  });

  it("쿠폰이 잘 삭제된다.", () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(couponsState, [mockCoupons[0], mockCoupons[1]])
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    act(() => result.current.unapplyCoupon(mockCoupons[1].id));

    expect(result.current.couponList).toEqual([mockCoupons[0]]);
  });
  it("2개 이상의 쿠폰을 적용하고 있으면, 오래된 쿠폰과 교체한다.", () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(couponsState, [mockCoupons[0], mockCoupons[1]])
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    act(() => result.current.applyCoupon(mockCoupons[2]));

    expect(result.current.couponList).toEqual([mockCoupons[1], mockCoupons[2]]);
  });
});
