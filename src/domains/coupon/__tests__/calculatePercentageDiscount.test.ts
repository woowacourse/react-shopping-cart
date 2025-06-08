import { calculatePercentageDiscount } from "../calculations/basic/calculatePercentageDiscount";
import { Coupon } from "../types/response";

describe("calculatePercentageDiscount 함수 테스트", () => {
  const basePercentageCoupon: Coupon = {
    id: 1,
    code: "PERCENT10",
    description: "10% 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 10,
    minimumAmount: 10000,
  };

  const noMinimumCoupon: Coupon = {
    id: 2,
    code: "PERCENT5",
    description: "5% 할인 쿠폰 (최소 주문 금액 없음)",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 5,
  };

  const otherTypeCoupon: Coupon = {
    id: 3,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 5000,
  };

  it("percentage 타입 쿠폰은 주문 금액의 지정된 비율만큼 할인한다", () => {
    const orderPrice = 20000;
    const discount = calculatePercentageDiscount(
      basePercentageCoupon,
      orderPrice
    );

    // 20000 * 10% = 2000
    expect(discount).toBe(2000);
  });

  it("소수점이 발생하는 경우 내림 처리한다", () => {
    const orderPrice = 12345;
    const discount = calculatePercentageDiscount(
      basePercentageCoupon,
      orderPrice
    );

    // 12345 * 10% = 1234.5 -> 내림 처리하여 1234
    expect(discount).toBe(1234);
  });

  it("최소 주문 금액 미만이면 할인이 적용되지 않는다", () => {
    const lowerOrderPrice = 9000; // 최소 주문 금액(10000) 미만
    const discount = calculatePercentageDiscount(
      basePercentageCoupon,
      lowerOrderPrice
    );

    expect(discount).toBe(0);
  });

  it("최소 주문 금액과 정확히 일치하는 경우에도 할인이 적용된다", () => {
    const exactOrderPrice = 10000;
    const discount = calculatePercentageDiscount(
      basePercentageCoupon,
      exactOrderPrice
    );

    // 10000 * 10% = 1000
    expect(discount).toBe(1000);
  });

  it("최소 주문 금액이 지정되지 않은 쿠폰은 금액에 상관없이 할인이 적용된다", () => {
    const lowOrderPrice = 1000;
    const discount = calculatePercentageDiscount(
      noMinimumCoupon,
      lowOrderPrice
    );

    // 1000 * 5% = 50
    expect(discount).toBe(50);
  });

  it("percentage 타입이 아닌 쿠폰은 0을 반환한다", () => {
    const orderPrice = 20000;
    const discount = calculatePercentageDiscount(otherTypeCoupon, orderPrice);

    expect(discount).toBe(0);
  });

  it("discount 값이 없는 쿠폰은 0을 반환한다", () => {
    const invalidCoupon: Coupon = {
      id: 4,
      code: "INVALID",
      description: "잘못된 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "percentage",
      // discount 값 없음
    };

    const orderPrice = 20000;
    const discount = calculatePercentageDiscount(invalidCoupon, orderPrice);

    expect(discount).toBe(0);
  });

  it("주문 금액이 0인 경우 0을 반환한다", () => {
    const orderPrice = 0;
    const discount = calculatePercentageDiscount(
      basePercentageCoupon,
      orderPrice
    );

    expect(discount).toBe(0);
  });
});
