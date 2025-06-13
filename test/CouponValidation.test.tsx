import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCouponValidation } from "../src/hooks/useCouponValidation";
import { useSelectedItems } from "../src/hooks/useSelectedItems";
import { createMockCoupon } from "./utils/mockCoupons";
import { createMockCartItem } from "./utils/mockCartItems";

vi.mock("../src/hooks/useSelectedItems");

const mockUseSelectedItems = vi.mocked(useSelectedItems);

const isRemoteAreaShipping = false;

describe("쿠폰 유효성 검증", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("만료 기간 검증", () => {
    it("만료된 쿠폰은 유효하지 않다", () => {
      const mockItems = [createMockCartItem(1, "상품", 10000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const expiredCoupon = createMockCoupon(1, "EXPIRED", "fixed", 1000, {
        expirationDate: "2020-01-01",
      });

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(expiredCoupon)).toBe(false);
    });

    it("만료되지 않은 쿠폰은 유효하다", () => {
      const mockItems = [createMockCartItem(1, "상품", 10000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const validCoupon = createMockCoupon(1, "VALID", "fixed", 1000);

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(validCoupon)).toBe(true);
    });
  });

  describe("사용 가능 시간 검증", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it("사용 가능 시간 이전에는 쿠폰이 유효하지 않다", () => {
      vi.setSystemTime(new Date("2025-06-09T04:59:59"));

      const mockItems = [createMockCartItem(1, "상품", 10000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const timeLimitedCoupon = createMockCoupon(1, "TIME", "percentage", 20, {
        availableTime: { start: "05:00", end: "17:00" },
      });

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(timeLimitedCoupon)).toBe(false);
    });

    it("사용 가능 시간 내에는 쿠폰이 유효하다", () => {
      vi.setSystemTime(new Date("2025-06-09T10:00:00"));

      const mockItems = [createMockCartItem(1, "상품", 10000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const timeLimitedCoupon = createMockCoupon(1, "TIME", "percentage", 20, {
        availableTime: { start: "05:00", end: "17:00" },
      });

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(timeLimitedCoupon)).toBe(true);
    });
  });

  describe("고정 할인 쿠폰 검증", () => {
    it("최소 주문 금액 미만일 때 유효하지 않다", () => {
      const mockItems = [createMockCartItem(1, "상품", 3000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const fixedCoupon = createMockCoupon(1, "FIXED", "fixed", 1000, {
        minimumAmount: 5000,
      });

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(fixedCoupon)).toBe(false);
    });

    it("최소 주문 금액 이상일 때 유효하다", () => {
      const mockItems = [createMockCartItem(1, "상품", 5000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const fixedCoupon = createMockCoupon(1, "FIXED", "fixed", 1000, {
        minimumAmount: 5000,
      });

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(fixedCoupon)).toBe(true);
    });
  });

  describe("무료 배송 쿠폰 검증", () => {
    it("최소 주문 금액 미만일 때 유효하지 않다", () => {
      const mockItems = [createMockCartItem(1, "상품", 5000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const freeShippingCoupon = createMockCoupon(
        1,
        "FREESHIP",
        "freeShipping",
        undefined,
        {
          minimumAmount: 10000,
        }
      );

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(freeShippingCoupon)).toBe(false);
    });

    it("일반 배송비 무료 조건을 만족하면 유효하다", () => {
      const mockItems = [createMockCartItem(1, "상품", 20000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const freeShippingCoupon = createMockCoupon(
        1,
        "FREESHIP",
        "freeShipping",
        undefined,
        {
          minimumAmount: 10000,
        }
      );

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(freeShippingCoupon)).toBe(true);
    });
  });

  describe("BuyXGetY 쿠폰 검증", () => {
    it("필요 수량이 부족하면 유효하지 않다", () => {
      const mockItems = [createMockCartItem(1, "상품", 1000, "식료품", 2)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 2,
        selectedItemCount: 1,
      });

      const buyXGetYCoupon = createMockCoupon(
        1,
        "BOGO",
        "buyXgetY",
        undefined,
        {
          buyQuantity: 3,
          getQuantity: 1,
        }
      );

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(buyXGetYCoupon)).toBe(false);
    });

    it("필요 수량을 만족하면 유효하다", () => {
      const mockItems = [createMockCartItem(1, "상품", 1000, "식료품", 4)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 4,
        selectedItemCount: 1,
      });

      const buyXGetYCoupon = createMockCoupon(
        1,
        "BOGO",
        "buyXgetY",
        undefined,
        {
          buyQuantity: 3,
          getQuantity: 1,
        }
      );

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      expect(result.current.isCouponValid(buyXGetYCoupon)).toBe(true);
    });
  });

  describe("유효한 쿠폰 필터링", () => {
    it("유효하지 않은 쿠폰들을 제거한다", () => {
      const mockItems = [createMockCartItem(1, "상품", 3000, "식료품", 1)];
      mockUseSelectedItems.mockReturnValue({
        selectedItems: mockItems,
        totalQuantity: 1,
        selectedItemCount: 1,
      });

      const coupons = [
        createMockCoupon(1, "VALID", "percentage", 10),
        createMockCoupon(2, "INVALID", "fixed", 1000, { minimumAmount: 5000 }),
        createMockCoupon(3, "EXPIRED", "fixed", 500, {
          expirationDate: "2020-01-01",
        }),
      ];

      const { result } = renderHook(() =>
        useCouponValidation(isRemoteAreaShipping)
      );
      const validCoupons = result.current.getValidCoupons(coupons);

      expect(validCoupons).toHaveLength(1);
      expect(validCoupons[0].code).toBe("VALID");
    });
  });
});
