// calculateDiscountAmount.test.ts
import { calculateDiscountAmount } from "../src/domains/discount";
import {
  BuyXGetYCoupon,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "../src/types/coupon";
import { CartItemType } from "../src/types/response";

describe("calculateDiscountAmount", () => {
  it("should calculate fixed coupon discount", () => {
    const coupon: FixedCoupon = {
      id: 1,
      code: "FIXED5000",
      description: "5,000원 할인 쿠폰",
      expirationDate: "2025-11-30",
      discountType: "fixed",
      discount: 5000,
      minimumAmount: 10000,
    };

    const result = calculateDiscountAmount({
      price: 20000,
      cartItems: [],
      deliveryCost: 3000,
      selectedCoupon: [coupon],
    });

    expect(result).toBe(5000);
  });

  it("should calculate percentage coupon discount", () => {
    const coupon: PercentageCoupon = {
      id: 2,
      code: "PERCENT30",
      description: "30% 할인 쿠폰",
      expirationDate: "2025-11-30",
      discountType: "percentage",
      discount: 30,
      availableTime: {
        start: "00:00:00",
        end: "23:59:59",
      },
    };

    const result = calculateDiscountAmount({
      price: 10000,
      cartItems: [],
      deliveryCost: 3000,
      selectedCoupon: [coupon],
    });

    expect(result).toBe(3000);
  });

  it("should calculate free shipping discount", () => {
    const coupon: FreeShippingCoupon = {
      id: 3,
      code: "FREESHIP",
      description: "무료 배송 쿠폰",
      expirationDate: "2025-11-30",
      discountType: "freeShipping",
      minimumAmount: 10000,
    };

    const result = calculateDiscountAmount({
      price: 15000,
      cartItems: [],
      deliveryCost: 3000,
      selectedCoupon: [coupon],
    });

    expect(result).toBe(3000);
  });

  it("should calculate buyXgetY discount", () => {
    const coupon: BuyXGetYCoupon = {
      id: 4,
      code: "BOGO",
      description: "2개 구매시 1개 무료",
      expirationDate: "2025-11-30",
      discountType: "buyXgetY",
      buyQuantity: 2,
      getQuantity: 1,
    };

    const cartItems: CartItemType[] = [
      {
        product: { price: 10000 },
        quantity: 3,
      } as CartItemType,
    ];

    const result = calculateDiscountAmount({
      price: 30000,
      cartItems,
      deliveryCost: 0,
      selectedCoupon: [coupon],
    });

    expect(result).toBe(10000);
  });
});
