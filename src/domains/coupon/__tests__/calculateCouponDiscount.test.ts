import { CartItemWithSelection } from "../../cart/types/response";
import { Coupon } from "../types/response";
import { calculateCouponDiscount } from "../calculations/combined/calculateCouponDiscount";
import * as basicCalculations from "../calculations/basic";

jest.mock("../calculations/basic", () => ({
  calculateFixedDiscount: jest.fn().mockReturnValue(5000),
  calculatePercentageDiscount: jest.fn().mockReturnValue(2000),
  calculateBuyXGetYDiscount: jest.fn().mockReturnValue(10000),
  calculateShippingDiscount: jest.fn().mockReturnValue(3000),
}));

describe("calculateCouponDiscount 함수 테스트", () => {
  const orderPrice = 50000;
  const shippingFee = 3000;

  const mockItems: CartItemWithSelection[] = [
    {
      id: 101,
      quantity: 3,
      selected: true,
      product: {
        id: 1,
        name: "유기농 바나나",
        price: 10000,
        imageUrl: "https://banana.jpg",
        category: "식료품",
        stock: 10,
      },
    },
    {
      id: 102,
      quantity: 2,
      selected: true,
      product: {
        id: 2,
        name: "신선한 사과 1kg",
        price: 15000,
        imageUrl: "https://apple.jpg",
        category: "식료품",
        stock: 8,
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fixed 타입 쿠폰은 calculateFixedDiscount를 호출한다", () => {
    const fixedCoupon: Coupon = {
      id: 1,
      code: "FIXED5000",
      description: "5,000원 할인 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "fixed",
      discount: 5000,
    };

    const result = calculateCouponDiscount(
      fixedCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(basicCalculations.calculateFixedDiscount).toHaveBeenCalledWith(
      fixedCoupon,
      orderPrice
    );
    expect(result).toBe(5000);
  });

  it("percentage 타입 쿠폰은 calculatePercentageDiscount를 호출한다", () => {
    const percentageCoupon: Coupon = {
      id: 2,
      code: "PERCENT10",
      description: "10% 할인 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "percentage",
      discount: 10,
    };

    const result = calculateCouponDiscount(
      percentageCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(basicCalculations.calculatePercentageDiscount).toHaveBeenCalledWith(
      percentageCoupon,
      orderPrice
    );
    expect(result).toBe(2000);
  });

  it("buyXgetY 타입 쿠폰은 calculateBuyXGetYDiscount를 호출한다", () => {
    const buyXGetYCoupon: Coupon = {
      id: 3,
      code: "BUY2GET1",
      description: "2+1 할인 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "buyXgetY",
      buyQuantity: 2,
      getQuantity: 1,
    };

    const result = calculateCouponDiscount(
      buyXGetYCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(basicCalculations.calculateBuyXGetYDiscount).toHaveBeenCalledWith(
      buyXGetYCoupon,
      mockItems
    );
    expect(result).toBe(10000);
  });

  it("freeShipping 타입 쿠폰은 calculateShippingDiscount를 호출한다", () => {
    const shippingCoupon: Coupon = {
      id: 4,
      code: "FREESHIP",
      description: "무료 배송 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "freeShipping",
      minimumAmount: 30000,
    };

    const result = calculateCouponDiscount(
      shippingCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(basicCalculations.calculateShippingDiscount).toHaveBeenCalledWith(
      shippingCoupon,
      orderPrice,
      shippingFee
    );
    expect(result).toBe(3000);
  });

  it("알 수 없는 쿠폰 타입은 0을 반환한다", () => {
    const unknownCoupon: Coupon = {
      id: 5,
      code: "UNKNOWN",
      description: "알 수 없는 타입의 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "unknown",
    };

    const result = calculateCouponDiscount(
      unknownCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(basicCalculations.calculateFixedDiscount).not.toHaveBeenCalled();
    expect(
      basicCalculations.calculatePercentageDiscount
    ).not.toHaveBeenCalled();
    expect(basicCalculations.calculateBuyXGetYDiscount).not.toHaveBeenCalled();
    expect(basicCalculations.calculateShippingDiscount).not.toHaveBeenCalled();

    expect(result).toBe(0);
  });
});
