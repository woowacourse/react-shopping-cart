import { calculateFixedDiscount } from "../calculations/basic/calculateFixedDiscount";
import { Coupon } from "../types/response";

describe("calculateFixedDiscount 함수 테스트", () => {
  const baseFixedCoupon: Coupon = {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 5000,
    minimumAmount: 10000,
  };

  const noMinimumCoupon: Coupon = {
    id: 2,
    code: "FIXED2000",
    description: "2,000원 할인 쿠폰 (최소 주문 금액 없음)",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 2000,
  };

  const otherTypeCoupon: Coupon = {
    id: 3,
    code: "PERCENT10",
    description: "10% 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 10,
  };

  it("fixed 타입 쿠폰은 지정된 금액만큼 할인한다", () => {
    const orderPrice = 15000;
    const discount = calculateFixedDiscount(baseFixedCoupon, orderPrice);

    expect(discount).toBe(5000);
  });

  it("최소 주문 금액 미만이면 할인이 적용되지 않는다", () => {
    const lowerOrderPrice = 8000; // 최소 주문 금액(10000) 미만
    const discount = calculateFixedDiscount(baseFixedCoupon, lowerOrderPrice);

    expect(discount).toBe(0);
  });

  it("최소 주문 금액과 정확히 일치하는 경우에도 할인이 적용된다", () => {
    const exactOrderPrice = 10000;
    const discount = calculateFixedDiscount(baseFixedCoupon, exactOrderPrice);

    expect(discount).toBe(5000);
  });

  it("최소 주문 금액이 지정되지 않은 쿠폰은 금액에 상관없이 할인이 적용된다", () => {
    const lowOrderPrice = 1000;
    const discount = calculateFixedDiscount(noMinimumCoupon, lowOrderPrice);

    expect(discount).toBe(2000);
  });

  it("fixed 타입이 아닌 쿠폰은 0을 반환한다", () => {
    const orderPrice = 20000;
    const discount = calculateFixedDiscount(otherTypeCoupon, orderPrice);

    expect(discount).toBe(0);
  });

  it("discount 값이 없는 쿠폰은 0을 반환한다", () => {
    const invalidCoupon: Coupon = {
      id: 4,
      code: "INVALID",
      description: "잘못된 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "fixed",
      // discount 값 없음
    };

    const orderPrice = 20000;
    const discount = calculateFixedDiscount(invalidCoupon, orderPrice);

    expect(discount).toBe(0);
  });

  it("주문 금액이 0인 경우 0을 반환한다", () => {
    const orderPrice = 0;
    const discount = calculateFixedDiscount(baseFixedCoupon, orderPrice);

    expect(discount).toBe(0);
  });
});
