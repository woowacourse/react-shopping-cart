import { describe, it, expect } from "vitest";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getBestCouponCombination } from "./getBestCouponCombination";

const createMockCoupon = (discountAmount: number): Coupon => ({
  id: 1,
  code: "Test Coupon Code",
  description: `${discountAmount}원 할인 쿠폰`,
  expirationDate: "2025-12-25",
  discountType: "fixed",
  discount: discountAmount,
  minimumAmount: 0,
});

const createCartItem = (price: number, quantity: number): CartItemType => ({
  id: 1,
  quantity,
  product: {
    id: 1,
    name: "Test Product",
    price,
    imageUrl: "",
    quantity: 999,
  },
});

describe("최적 쿠폰 조합 선택 로직", () => {
  const baseOptions = {
    orderList: [createCartItem(50000, 10)],
    couponCount: 2,
    deliveryPrice: 3000,
  };

  it("할인액이 가장 큰 순서로 쿠폰 선택", () => {
    const coupons = [
      createMockCoupon(30000),
      createMockCoupon(5000),
      createMockCoupon(20000),
    ];

    const result = getBestCouponCombination({
      ...baseOptions,
      availableCoupons: coupons,
    });

    expect(result).toHaveLength(2);
    expect(result[0].discountAmount).toBe(30000);
    expect(result[1].discountAmount).toBe(20000);
  });

  it("사용 가능 쿠폰보다 많은 수 요청 시 전체 반환", () => {
    const coupons = [createMockCoupon(15000)];

    const result = getBestCouponCombination({
      ...baseOptions,
      couponCount: 5,
      availableCoupons: coupons,
    });

    expect(result).toHaveLength(coupons.length);
  });
});
