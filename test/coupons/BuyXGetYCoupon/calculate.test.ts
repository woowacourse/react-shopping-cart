import { describe, expect, it } from "vitest";
import { BuyXGetYCoupon } from "../../../src/type/Coupons";
import { calculateBuyXGetYCoupon } from "../../../src/util/coupons/BuyXGetYCoupon/calculate";

const baseBuyXGetYCoupon: BuyXGetYCoupon = {
  id: 2,
  code: "BOGO",
  description: "2개 구매 시 1개 무료 쿠폰",
  expirationDate: "2025-06-30",
  buyQuantity: 2,
  getQuantity: 1,
  discountType: "buyXgetY",
};

const testCartItems = [
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

describe("calculateBuyXGetYCoupon", () => {
  const { buyQuantity, getQuantity } = baseBuyXGetYCoupon;

  it("상품 수량이 (buyQuantity + getQuantity)와 정확히 같을 때 가장 비싼 아이템의 가격을 반환해야 한다 (경계값)", () => {
    const itemsAt = buyQuantity + getQuantity;
    const itemsAtBoundary = [
      { ...testCartItems[0], quantity: itemsAt },
      { ...testCartItems[1], quantity: itemsAt },
    ];

    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: itemsAtBoundary,
      })
    ).toBe(850000 * 1);
  });

  it("상품 수량이 (buyQuantity + getQuantity)보다 1개 많을 때 가장 비싼 아이템의 가격을 반환해야 한다 (경계값 초과)", () => {
    const itemsAbove = buyQuantity + getQuantity + 1;
    const itemsAboveBoundary = [
      { ...testCartItems[0], quantity: itemsAbove },
      { ...testCartItems[1], quantity: itemsAbove },
    ];

    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: itemsAboveBoundary,
      })
    ).toBe(850000 * 1);
  });

  it("상품 수량이 (buyQuantity + getQuantity)보다 1개 적을 때 할인이 적용되지 않아야 한다 (경계값 미달)", () => {
    const itemsBelow = buyQuantity + getQuantity - 1;
    const itemsBelowBoundary = [
      { ...testCartItems[0], quantity: itemsBelow },
      { ...testCartItems[1], quantity: itemsBelow },
    ];

    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: itemsBelowBoundary,
      })
    ).toBe(0);
  });

  it("getQuantity가 0일 때 할인 금액이 0이어야 한다 (경계값)", () => {
    const couponWithZeroGet = { ...baseBuyXGetYCoupon, getQuantity: 0 };

    expect(
      calculateBuyXGetYCoupon({
        coupon: couponWithZeroGet,
        cartItems: testCartItems,
      })
    ).toBe(0);
  });

  it("할인 적용 가능한 상품이 없는 경우 0을 반환해야 한다", () => {
    const itemsBelow = buyQuantity + getQuantity - 1;
    const noMatchingItems = [
      { ...testCartItems[0], quantity: itemsBelow },
      { ...testCartItems[1], quantity: itemsBelow },
    ];

    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: noMatchingItems,
      })
    ).toBe(0);
  });

  it("장바구니가 비어있는 경우 0을 반환해야 한다", () => {
    const emptyCartItems: typeof testCartItems = [];
    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: emptyCartItems,
      })
    ).toBe(0);
  });

  it("다양한 수량의 상품들 중 조건을 만족하는 가장 비싼 상품을 찾아 할인액을 반환해야 한다", () => {
    const itemsAt = buyQuantity + getQuantity;
    const itemsAbove = buyQuantity + getQuantity + 1;

    const mixedCartItems = [
      {
        ...testCartItems[0],
        quantity: itemsAt,
        product: { ...testCartItems[0].product, price: 1000 },
      },
      {
        ...testCartItems[0],
        quantity: itemsAbove + 4,
        product: { ...testCartItems[0].product, price: 20000 },
      },
      {
        ...testCartItems[1],
        quantity: itemsAbove,
        product: { ...testCartItems[1].product, price: 100000 },
      },
    ];

    expect(
      calculateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: mixedCartItems,
      })
    ).toBe(100000 * 1);
  });
});
