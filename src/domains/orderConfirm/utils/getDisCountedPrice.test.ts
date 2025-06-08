import { describe, it, expect } from "vitest";
import { CouponCode } from "../types/coupon";
import { getDisCountedPrice } from "./getDisCountedPrice";

describe("getDisCountedPrice 함수 기능 테스트", () => {
  const baseProps = {
    deliveryFee: 3000,
    orderPrice: 20000,
    maxPriceInSelectedCart: 5000,
  };

  it("쿠폰이 없으면 할인 금액은 0", () => {
    const result = getDisCountedPrice({
      ...baseProps,
      selectedCoupons: [],
    });
    expect(result).toBe(0);
  });

  const singleCouponCases: [CouponCode[], number][] = [
    [["FIXED5000"], 5000],
    [["BOGO"], 5000],
    [["FREESHIPPING"], 3000],
    [["MIRACLESALE"], 6000], // 30% 할인
  ];

  it.each(singleCouponCases)(
    "쿠폰이 하나일 경우 %s → 할인 %i",
    (selectedCoupons: CouponCode[], expected) => {
      const result = getDisCountedPrice({
        ...baseProps,
        selectedCoupons,
      });

      expect(result).toBe(expected);
    }
  );

  it("쿠폰이 두 개인 경우, 순서에 따라 더 큰 할인 선택", () => {
    const result = getDisCountedPrice({
      ...baseProps,
      selectedCoupons: ["MIRACLESALE", "FIXED5000"],
    });

    // 1. MIRACLESALE → 6000, 남은 14000 → FIXED5000 → 5000 → 총 11000
    // 2. FIXED5000 → 5000, 남은 15000 → MIRACLESALE → 4500 → 총 9500
    // 최대값 = 11000

    expect(result).toBe(11000);
  });

  it("동일한 할인 결과가 나올 경우도 정확하게 계산됨", () => {
    const result = getDisCountedPrice({
      ...baseProps,
      selectedCoupons: ["FIXED5000", "FREESHIPPING"],
    });

    // 1. FIXED5000 → 5000, 남은 15000 → FREESHIPPING → 3000 → 총 8000
    // 2. FREESHIPPING → 3000, 남은 17000 → FIXED5000 → 5000 → 총 8000

    expect(result).toBe(8000);
  });
});
