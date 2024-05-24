import { FixedDiscountCoupon } from "../types/coupons";
import { calculateDiscountAmountOfCoupon } from "./calculateDiscountAmountOfCoupon";

describe("calculateDiscountAmountOfCoupon: 쿠폰 할인 금액 계산", () => {
  describe("고정 할인 쿠폰", () => {
    it("쿠폰 적용 가능 조건이 없으면, 할인 금액을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        orderAmount
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        orderAmount
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50_000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        orderAmount
      );

      expect(discountAmount).toBe(0);
    });

    // TODO: 사용 가능 시간 조건 -> 개발 필요
    // it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {});
    // it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {});
    // TODO: 최소 주문 금액 조건 + 사용 가능 시간 조건 -> 개발 필요
    // it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {});
    // it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {});
  });
});
