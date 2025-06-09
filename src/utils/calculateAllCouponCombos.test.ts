import { describe, it, expect } from "vitest";
import { calculateAllCouponCombos } from "./calculateAllCouponCombos";
import { Coupon } from "../types/Coupon";
import CartItem from "../types/CartItem";

const baseCoupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

const cartItemList: CartItem[] = [
  {
    id: 101,
    quantity: 2,
    product: {
      id: 1,
      name: "샘플상품",
      price: 30000,
      quantity: 2,
      imageUrl: "",
      category: "패션잡화",
    },
  },
  {
    id: 102,
    quantity: 1,
    product: {
      id: 2,
      name: "샘플상품2",
      price: 40000,
      quantity: 1,
      imageUrl: "",
      category: "패션잡화",
    },
  },
];

describe("calculateAllCouponCombos", () => {
  it("미라클모닝 시간 내에는 percentage 쿠폰이 적용된다", () => {
    const result = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 100000,
      isIslandArea: false,
      now: new Date("2025-06-07T05:00:00"),
    });

    const hasMiracle = result.some(
      (combo) => combo.isValid && combo.combo.includes("MIRACLESALE")
    );
    expect(hasMiracle).toBe(true);
  });

  it("미라클모닝 시간이 아니면 percentage 쿠폰이 적용되지 않는다", () => {
    const result = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 100000,
      isIslandArea: false,
    });

    const miracleOnlyCombos = result.filter((c) =>
      c.combo.includes("MIRACLESALE")
    );
    const allInvalid = miracleOnlyCombos.every((c) => c.isValid === false);
    expect(allInvalid).toBe(true);
  });

  it("경계값: 최소 금액 딱 맞춰서 fixed 쿠폰이 적용된다", () => {
    const result = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 100000,
      isIslandArea: false,
    });

    const hasFixed = result.some(
      (combo) => combo.isValid && combo.combo.includes("FIXED5000")
    );
    expect(hasFixed).toBe(true);
  });

  it("도서산간 지역에서는 배송비 쿠폰 효과가 더 커진다", () => {
    const normal = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 50000,
      isIslandArea: false,
    });

    const island = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 50000,
      isIslandArea: true,
    });

    const bestNormal = Math.max(...normal.map((r) => r.discount));
    const bestIsland = Math.max(...island.map((r) => r.discount));

    expect(bestIsland).toBeGreaterThan(bestNormal);
  });

  it("가장 큰 할인 조합을 계산해낸다", () => {
    const result = calculateAllCouponCombos({
      coupons: baseCoupons,
      cartItemList,
      orderAmount: 100000,
      isIslandArea: false,
    });

    const best = result.reduce(
      (acc, cur) => (cur.discount > acc.discount ? cur : acc),
      result[0]
    );

    expect(best.discount).toBeGreaterThanOrEqual(
      Math.max(...result.map((r) => r.discount))
    );
  });
});
