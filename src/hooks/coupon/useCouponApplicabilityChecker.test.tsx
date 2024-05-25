import { mockCartItemList } from "@/mocks/cartItemList";
import { mockCoupons } from "@/mocks/coupons";
import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import useCouponApplicabilityChecker from "./useCouponApplicabilityChecker";

jest.mock("../auth/apis/cart", () => ({
  getCartItems: jest.fn().mockImplementation(() => mockCartItemList),
  getCoupons: jest.fn().mockImplementation(() => mockCoupons),
}));

describe("useCouponApplicabilityChecker", () => {
  it("주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가", async () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await waitFor(() => {
      expect(
        result.current.isCouponApplicable({
          coupon: mockCoupons[0],
          price: 50000,
        })
      ).toBe(false);
    });
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능", async () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await waitFor(() => {
      expect(
        result.current.isCouponApplicable({
          coupon: mockCoupons[0],
          price: 100000,
        })
      ).toBe(true);
    });
  });

  it("이미 기한이 지난 시간이면 쿠폰 적용 불가", async () => {
    const testTime = new Date("2024-11-31");

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await waitFor(() => {
      expect(
        result.current.isCouponApplicable({
          coupon: mockCoupons[0],
          time: testTime,
        })
      ).toBe(false);
    });
  });

  it("기한이 유효기간 내이면 쿠폰 적용 가능", async () => {
    const testTime = new Date("2024-11-30");

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await waitFor(() => {
      expect(
        result.current.isCouponApplicable({
          coupon: mockCoupons[0],
          time: testTime,
        })
      ).toBe(true);
    });
  });
});
