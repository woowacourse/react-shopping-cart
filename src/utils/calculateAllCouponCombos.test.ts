import { describe, it, expect } from "vitest";
import { calculateAllCouponCombos } from "./calculateAllCouponCombos";

import type { Coupon } from "../types/Coupon";
import type CartItem from "../types/CartItem";

describe("calculateAllCouponCombos", () => {
  const baseCartItems: CartItem[] = [
    {
      product: {
        id: 1,
        name: "상품1",
        price: 10000,
        imageUrl: "",
        category: "패션잡화",
        quantity: 0,
      },
      id: 1,
      quantity: 3,
    },
  ];

  const baseOrderAmount = 30000;

  it("조건에 맞는 쿠폰만 필터링된다", () => {
    const coupons: Coupon[] = [
      {
        id: 1,
        code: "FIXED_5000",
        description: "5000원 할인",
        discountType: "fixed",
        discount: 5000,
        minimumAmount: 20000,
        expirationDate: "2099-12-31",
      },
      {
        id: 2,
        code: "FIXED_UNDER_MIN",
        description: "최소금액 미달 쿠폰",
        discountType: "fixed",
        discount: 5000,
        minimumAmount: 40000,
        expirationDate: "2099-12-31",
      },
    ];

    const result = calculateAllCouponCombos({
      coupons,
      cartItemList: baseCartItems,
      orderAmount: baseOrderAmount,
      isIslandArea: false,
    });

    const discounts = result.map((r) => r.discount);
    expect(discounts).toContain(5000);
    expect(discounts).toContain(0);
    expect(discounts).toHaveLength(3);
  });

  it("가장 큰 할인을 주는 조합이 최상단에 위치한다", () => {
    const coupons: Coupon[] = [
      {
        id: 1,
        code: "PERCENTAGE",
        description: "10% 할인",
        discountType: "percentage",
        discount: 10,
        expirationDate: "2099-12-31",
        availableTime: {
          start: "00:00",
          end: "23:59",
        },
      },
      {
        id: 2,
        code: "FIXED_3000",
        description: "3000원 할인",
        discountType: "fixed",
        discount: 3000,
        minimumAmount: 20000,
        expirationDate: "2099-12-31",
      },
    ];

    const result = calculateAllCouponCombos({
      coupons,
      cartItemList: baseCartItems,
      orderAmount: 40000,
      isIslandArea: false,
    });

    expect(result[0].discount).toBeGreaterThanOrEqual(result[1].discount);
  });

  it("무료배송 쿠폰은 도서산간 지역에 따라 다르게 계산된다", () => {
    const coupon: Coupon = {
      id: 1,
      code: "FREESHIP",
      description: "무료배송",
      discountType: "freeshipping",
      minimumAmount: 10000,
      expirationDate: "2099-12-31",
    };

    const normalResult = calculateAllCouponCombos({
      coupons: [coupon],
      cartItemList: baseCartItems,
      orderAmount: 50000,
      isIslandArea: false,
    });

    const islandResult = calculateAllCouponCombos({
      coupons: [coupon],
      cartItemList: baseCartItems,
      orderAmount: 50000,
      isIslandArea: true,
    });

    expect(islandResult[0].discount).toBeGreaterThan(normalResult[0].discount);
  });
});
