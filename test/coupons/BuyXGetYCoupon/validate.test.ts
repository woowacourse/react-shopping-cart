import { describe, expect, it } from "vitest";
import { BuyXGetYCoupon } from "../../../src/type/Coupons";
import { validateBuyXGetYCoupon } from "../../../src/util/coupons/BuyXGetYCoupon/validate";

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

describe("validateBuyXGetYCoupon", () => {
  const { buyQuantity, getQuantity } = baseBuyXGetYCoupon;

  it("상품 수량이 (buyQuantity + getQuantity)와 정확히 같을 때 유효하다 (경계값)", () => {
    const itemsAt = buyQuantity + getQuantity;
    const cartItemsAtBoundary = [{ ...testCartItems[0], quantity: itemsAt }];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: cartItemsAtBoundary,
      })
    ).toBe(true);
  });

  it("상품 수량이 (buyQuantity + getQuantity)보다 1개 많을 때 유효하다 (경계값 초과)", () => {
    const itemsAbove = buyQuantity + getQuantity + 1;

    const cartItemsAboveBoundary = [
      { ...testCartItems[0], quantity: itemsAbove },
    ];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: cartItemsAboveBoundary,
      })
    ).toBe(true);
  });

  it("상품이 하나고 상품 수량이 (buyQuantity + getQuantity)보다 1개 적을 때 유효하지 않다 (경계값 미달)", () => {
    const itemsBelow = buyQuantity + getQuantity - 1;

    const cartItemsBelowBoundary = [
      { ...testCartItems[0], quantity: itemsBelow },
    ];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: cartItemsBelowBoundary,
      })
    ).toBe(false);
  });

  it("다수의 상품 중 하나라도 조건을 만족하면 유효하다", () => {
    const itemsBelow = buyQuantity + getQuantity - 1;
    const itemsAt = buyQuantity + getQuantity;

    const mixedCartItems = [
      { ...testCartItems[0], quantity: itemsBelow },
      { ...testCartItems[1], quantity: itemsAt },
    ];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: mixedCartItems,
      })
    ).toBe(true);
  });

  it("모든 상품이 조건을 만족하지 못하면 유효하지 않다", () => {
    const itemsBelow = buyQuantity + getQuantity - 1;
    const allBelowBoundary = [
      { ...testCartItems[0], quantity: itemsBelow - 1 },
      { ...testCartItems[1], quantity: itemsBelow - 2 },
    ];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: allBelowBoundary,
      })
    ).toBe(false);
  });

  it("장바구니가 비어있는 경우 유효하지 않다", () => {
    const emptyCartItems: typeof testCartItems = [];

    expect(
      validateBuyXGetYCoupon({
        coupon: baseBuyXGetYCoupon,
        cartItems: emptyCartItems,
      })
    ).toBe(false);
  });
});
