import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { validateCoupons } from "../../src/util/coupons/validateCoupons";
import { Coupon } from "../../src/type/Coupons";
import { CartItem } from "../../src/type/CartItem";

const testCartItems: CartItem[] = [
  {
    id: 1,
    quantity: 3,
    product: {
      id: 8,
      name: "앵그리버드",
      price: 50000,
      imageUrl:
        "https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg",
      category: "패션잡화",
      quantity: 10,
    },
  },
  {
    id: 2,
    quantity: 3,
    product: {
      id: 29,
      name: "19×19×19 큐브",
      price: 850000,
      imageUrl:
        "https://i.namu.wiki/i/kQCwKHpwjePBTPXPTIizJSE0alohKKRlsGOJSrPhAdsODckkF05KNDV27xdydVqHLEdgM7yQu6NSUL-gE0t9SZH_cmaY8tMquJnfLQv5shH_pSdvsRc87hCcO5V3WBZrTwR23NYzoJJEoQIHWqAM4Q.webp",
      category: "패션잡화",
      quantity: 10,
    },
  },
];

const coupons: Coupon[] = [
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
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
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

describe("validateCoupons (Integration Test)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("쿠폰 유효기간이 만료되었으면 false를 반환해야 한다", () => {
    const today = new Date("2025-06-08T12:00:00");
    vi.setSystemTime(today);

    const expiredCoupon = { ...coupons[0], expirationDate: "2025-06-07" };

    const result = validateCoupons({
      cartItems: testCartItems,
      coupon: expiredCoupon,
      today,
    });
    expect(result).toBe(false);
  });

  it("쿠폰 유효기간이 오늘까지면 true를 반환해야 한다", () => {
    const today = new Date("2025-06-08T12:00:00");
    vi.setSystemTime(today);

    const validTodayCoupon = { ...coupons[0], expirationDate: "2025-06-08" };

    const result = validateCoupons({
      cartItems: testCartItems,
      coupon: validTodayCoupon,
      today,
    });

    expect(result).toBe(true);
  });

  it("쿠폰 유효기간이 아직 남았으면 true를 반환해야 한다", () => {
    const today = new Date("2025-06-08T12:00:00");
    vi.setSystemTime(today);

    const validFutureCoupon = { ...coupons[0], expirationDate: "2025-06-09" };

    const result = validateCoupons({
      cartItems: testCartItems,
      coupon: validFutureCoupon,
      today,
    });
    expect(result).toBe(true);
  });
});
