import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { mockCouponData } from "../mocks/mockCouponData";
import { couponsState } from "../recoil/atoms/atoms";
import { useDiscountCalculator } from "./useDiscountCalculator";

describe("useDiscountCalculator", () => {
  describe("고정 금액 할인", () => {
    it("고정 금액(5000원) 할인 쿠폰의 할인 금액을 계산할 수 있다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[0], 120000)).toBe(5000);
    });

    it("주문 금액이 최소 주문 금액 미만일 때는 고정 금액 할인이 적용되지 않는다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[0], 50000)).toBe(0);
    });
  });

  describe("Buy X Get Y 할인", () => {
    it("Buy X Get Y 할인 쿠폰의 할인 금액을 계산할 수 있다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[1], 100000, 4)).toBe(50000);
    });

    it("구매 수량이 buyQuantity 미만일 때는 Buy X Get Y 할인이 적용되지 않는다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[1], 100000, 1)).toBe(0);
    });
  });

  describe("비율 할인", () => {
    it("비율 할인 쿠폰의 할인 금액을 계산할 수 있다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[3], 100000)).toBe(30000);
    });
  });

  describe("무료 배송 할인", () => {
    it("주문 금액이 최소 주문 금액 이상일 때 무료 배송 할인이 적용된다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[2], 60000)).toBe(0);
    });

    it("주문 금액이 최소 주문 금액 미만일 때는 무료 배송 할인이 적용되지 않는다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCouponData)}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCouponData[2], 40000)).toBe(0);
    });
  });
});
