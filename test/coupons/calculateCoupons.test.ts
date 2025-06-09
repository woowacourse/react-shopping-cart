import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CartItem } from "../../src/type/CartItem";
import {
  BuyXGetYCoupon,
  FixedDiscountCoupon,
  PercentageDiscountCoupon,
} from "../../src/type/Coupons";
import { calculateCoupons } from "../../src/util/coupons/calculateCoupons";
import { calculateTotalPrice } from "../../src/util/cart/calculateTotalPrice";
import { calculateBuyXGetYCoupon } from "../../src/util/coupons/BuyXGetYCoupon/calculate";
import { calculateFixedDiscountCoupon } from "../../src/util/coupons/FixedDiscountCoupon/calculate";
import { calculatePercentageDiscountCoupon } from "../../src/util/coupons/PercentageDiscountCoupon/calculate";

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

const fixedCoupon: FixedDiscountCoupon = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 쿠폰",
  expirationDate: "2025-11-30",
  discount: 5000,
  minimumAmount: 100000,
  discountType: "fixed",
};

const buyXGetYCoupon: BuyXGetYCoupon = {
  id: 2,
  code: "BOGO",
  description: "2개 구매 시 1개 무료 쿠폰",
  expirationDate: "2025-06-30",
  buyQuantity: 2,
  getQuantity: 1,
  discountType: "buyXgetY",
};

const miracleSaleCoupon: PercentageDiscountCoupon = {
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
};

describe("calculateCoupons - Two Coupon Combinations", () => {
  const baseTotalPrice = calculateTotalPrice(testCartItems);

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("고정 금액 할인 쿠폰(FIXED)과 2+1 쿠폰(BuyXGetY) 적용시 둘 다 더하면 된다.", () => {
    const selectedCoupons = [fixedCoupon, buyXGetYCoupon];

    const today = new Date("2025-06-05T10:00:00");
    vi.setSystemTime(today);

    const { maxDiscountedPrice } = calculateCoupons({
      cartItems: testCartItems,
      coupons: selectedCoupons,
      hasRemoteAreaShipping: false,
    });

    const fixedDiscount = calculateFixedDiscountCoupon({ coupon: fixedCoupon });

    const buyXGetYDiscount = calculateBuyXGetYCoupon({
      cartItems: testCartItems,
      coupon: buyXGetYCoupon,
    });

    expect(maxDiscountedPrice).toBe(fixedDiscount + buyXGetYDiscount);
  });

  it("고정 금액 할인 쿠폰(FIXED)와 퍼센트 할인 쿠폰(MIRACLESALE) 적용시 퍼센트 할인이 먼저 적용되고 고정 금액 할인 쿠폰이 적용되어야 최대 할인을 받을 수 있다.", () => {
    const selectedCoupons = [fixedCoupon, miracleSaleCoupon];
    const fixedDiscount = calculateFixedDiscountCoupon({ coupon: fixedCoupon });
    const miracleSaleDiscount = calculatePercentageDiscountCoupon({
      totalPrice: baseTotalPrice,
      coupon: miracleSaleCoupon,
    });

    const today = new Date("2025-06-05T05:30:00");
    vi.setSystemTime(today);

    const { maxDiscountedPrice } = calculateCoupons({
      cartItems: testCartItems,
      coupons: selectedCoupons,
      hasRemoteAreaShipping: false,
    });

    expect(maxDiscountedPrice).toBe(miracleSaleDiscount + fixedDiscount);
  });

  it("고정 금액 할인 쿠폰(FIXED)와 퍼센트 할인 쿠폰(MIRACLESALE) 적용시 고정 금액 할인 쿠폰이 먼저 적용되면 최대 할인을 받을 수 없다.", () => {
    const selectedCoupons = [fixedCoupon, miracleSaleCoupon];
    const fixedDiscount = calculateFixedDiscountCoupon({ coupon: fixedCoupon });

    const notMiracleSaleDiscount = calculatePercentageDiscountCoupon({
      totalPrice: baseTotalPrice - fixedDiscount,
      coupon: miracleSaleCoupon,
    });

    const today = new Date("2025-06-05T05:30:00");
    vi.setSystemTime(today);

    const { maxDiscountedPrice } = calculateCoupons({
      cartItems: testCartItems,
      coupons: selectedCoupons,
      hasRemoteAreaShipping: false,
    });

    expect(maxDiscountedPrice).greaterThan(
      notMiracleSaleDiscount + fixedDiscount
    );
  });

  it("2+1 할인 쿠폰(BuyXGetY)와 퍼센트 할인 쿠폰(MIRACLESALE) 적용시 퍼센트 할인이 먼저 적용되고 2+1 쿠폰이 적용되어야 최대 할인을 받을 수 있다.", () => {
    const selectedCoupons = [buyXGetYCoupon, miracleSaleCoupon];
    const buyXGetYDiscount = calculateBuyXGetYCoupon({
      coupon: buyXGetYCoupon,
      cartItems: testCartItems,
    });

    const miracleSaleDiscount = calculatePercentageDiscountCoupon({
      totalPrice: baseTotalPrice,
      coupon: miracleSaleCoupon,
    });

    const today = new Date("2025-06-05T05:30:00");
    vi.setSystemTime(today);

    const { maxDiscountedPrice } = calculateCoupons({
      cartItems: testCartItems,
      coupons: selectedCoupons,
      hasRemoteAreaShipping: false,
    });

    expect(maxDiscountedPrice).toBe(miracleSaleDiscount + buyXGetYDiscount);
  });
});
