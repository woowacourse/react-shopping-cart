import { calculateShippingDiscount } from "../calculations/basic/calculateShippingDiscount";
import { Coupon } from "../types/response";

describe("calculateShippingDiscount 함수 테스트", () => {
  const baseShippingCoupon: Coupon = {
    id: 1,
    code: "FREESHIP",
    description: "무료 배송 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "freeShipping",
    minimumAmount: 30000,
  };

  const noMinimumCoupon: Coupon = {
    id: 2,
    code: "ALWAYSFREESHIP",
    description: "항상 무료 배송 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "freeShipping",
  };

  const otherTypeCoupon: Coupon = {
    id: 3,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 5000,
  };

  const baseShippingFee = 3000;

  it("freeShipping 타입 쿠폰은 배송비만큼 할인한다", () => {
    const orderPrice = 50000;
    const discount = calculateShippingDiscount(
      baseShippingCoupon,
      orderPrice,
      baseShippingFee
    );

    expect(discount).toBe(baseShippingFee);
  });

  it("최소 주문 금액 미만이면 배송비 할인이 적용되지 않는다", () => {
    const lowerOrderPrice = 25000;
    const discount = calculateShippingDiscount(
      baseShippingCoupon,
      lowerOrderPrice,
      baseShippingFee
    );

    expect(discount).toBe(0);
  });

  it("최소 주문 금액과 정확히 일치하는 경우에도 배송비 할인이 적용된다", () => {
    const exactOrderPrice = 30000;
    const discount = calculateShippingDiscount(
      baseShippingCoupon,
      exactOrderPrice,
      baseShippingFee
    );

    expect(discount).toBe(baseShippingFee);
  });

  it("최소 주문 금액이 지정되지 않은 쿠폰은 금액에 상관없이 배송비가 할인된다", () => {
    const lowOrderPrice = 1000;
    const discount = calculateShippingDiscount(
      noMinimumCoupon,
      lowOrderPrice,
      baseShippingFee
    );

    expect(discount).toBe(baseShippingFee);
  });

  it("freeShipping 타입이 아닌 쿠폰은 0을 반환한다", () => {
    const orderPrice = 50000;
    const discount = calculateShippingDiscount(
      otherTypeCoupon,
      orderPrice,
      baseShippingFee
    );

    expect(discount).toBe(0);
  });

  it("배송비가 0인 경우에도 정상 동작한다", () => {
    const orderPrice = 50000;
    const zeroShippingFee = 0;
    const discount = calculateShippingDiscount(
      baseShippingCoupon,
      orderPrice,
      zeroShippingFee
    );

    expect(discount).toBe(0);
  });
});
