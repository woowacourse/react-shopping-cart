// calculateDiscountAmount.test.ts
import { calculateDiscountAmount } from "../src/domains/discount";
import {
  BuyXGetYCoupon,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "../src/types/coupon";
import { CartItemType } from "../src/types/response";

describe("할인 금액 계산 테스트", () => {
  it("정액 쿠폰이 적용되면 해당 금액만큼 할인해야 한다", () => {
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

  it("퍼센트 쿠폰이 적용되면 해당 비율만큼 할인해야 한다", () => {
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

  it("무료배송 쿠폰이 적용되면 배송비만큼 할인해야 한다", () => {
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

  it("BuyXGetY 쿠폰이 적용되면 가장 비싼 상품 기준으로 무료 수량만큼 할인해야 한다", () => {
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

describe("쿠폰 2개 조합 테스트", () => {
  const baseCartItems: CartItemType[] = [
    {
      product: { price: 10000 },
      quantity: 3,
    } as CartItemType,
  ];

  const fixed: FixedCoupon = {
    id: 1,
    code: "FIXED5000",
    description: "5000원 할인",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 5000,
    minimumAmount: 10000,
  };

  const percentage: PercentageCoupon = {
    id: 2,
    code: "PERCENT10",
    description: "10% 할인",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 10,
    availableTime: {
      start: "00:00:00",
      end: "23:59:59",
    },
  };

  const freeShipping: FreeShippingCoupon = {
    id: 3,
    code: "FREESHIP",
    description: "무료배송",
    expirationDate: "2025-12-31",
    discountType: "freeShipping",
    minimumAmount: 10000,
  };

  const buyXgetY: BuyXGetYCoupon = {
    id: 4,
    code: "BOGO",
    description: "2+1",
    expirationDate: "2025-12-31",
    discountType: "buyXgetY",
    buyQuantity: 2,
    getQuantity: 1,
  };

  it("정액 쿠폰과 퍼센트 쿠폰을 함께 적용했을 때, 순서에 따라 할인 금액이 올바르게 계산되어야 한다", () => {
    const discount1 = calculateDiscountAmount({
      price: 20000,
      cartItems: baseCartItems,
      deliveryCost: 3000,
      selectedCoupon: [fixed, percentage],
    });

    const discount2 = calculateDiscountAmount({
      price: 20000,
      cartItems: baseCartItems,
      deliveryCost: 3000,
      selectedCoupon: [percentage, fixed],
    });

    expect(discount1).toBe(discount2);
  });

  it("정액 쿠폰과 무료배송 쿠폰을 함께 적용했을 때, 두 쿠폰의 할인 효과가 모두 반영되어야 한다", () => {
    const discount = calculateDiscountAmount({
      price: 20000,
      cartItems: baseCartItems,
      deliveryCost: 3000,
      selectedCoupon: [fixed, freeShipping],
    });

    expect(discount).toBe(8000);
  });

  it("정액 쿠폰과 묶음 쿠폰을 함께 적용했을 때, 두 쿠폰의 할인 효과가 모두 반영되어야 한다", () => {
    const discount = calculateDiscountAmount({
      price: 30000,
      cartItems: baseCartItems,
      deliveryCost: 0,
      selectedCoupon: [fixed, buyXgetY],
    });

    expect(discount).toBe(15000);
  });

  it("퍼센트 쿠폰과 무료배송 쿠폰을 함께 적용했을 때, 두 쿠폰의 할인 효과가 모두 반영되어야 한다", () => {
    const discount = calculateDiscountAmount({
      price: 20000,
      cartItems: baseCartItems,
      deliveryCost: 3000,
      selectedCoupon: [percentage, freeShipping],
    });

    expect(discount).toBe(5000);
  });

  it("퍼센트 쿠폰과 묶음 쿠폰을 함께 적용했을 때, 순서에 관계없이 할인 금액이 동일해야 한다", () => {
    const discount1 = calculateDiscountAmount({
      price: 30000,
      cartItems: baseCartItems,
      deliveryCost: 0,
      selectedCoupon: [percentage, buyXgetY],
    });

    const discount2 = calculateDiscountAmount({
      price: 30000,
      cartItems: baseCartItems,
      deliveryCost: 0,
      selectedCoupon: [buyXgetY, percentage],
    });

    expect(discount1).toBe(discount2);
  });

  it("무료배송 쿠폰과 묶음 쿠폰을 함께 적용했을 때, 두 쿠폰의 할인 효과가 모두 반영되어야 한다", () => {
    const discount = calculateDiscountAmount({
      price: 30000,
      cartItems: baseCartItems,
      deliveryCost: 3000,
      selectedCoupon: [freeShipping, buyXgetY],
    });

    expect(discount).toBe(13000);
  });
});
