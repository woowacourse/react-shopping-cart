import { CartItem } from "../../../types/cartItems";
import {
  BuyXGetYRawCoupon,
  FixedDiscountRawCoupon,
  FreeShippingRawCoupon,
} from "../../../types/rawCoupon";
import { COUPON_DISCOUNT_TYPE } from "../../../constants/couponDiscountType";
import { CartAmount } from "../../../recoil/cartAmount";
import { isCouponSelectable } from ".";

describe("isCouponSelectable", () => {
  const cartItems: CartItem[] = [
    {
      id: 1,
      isSelected: true,
      quantity: 3,
      product: { id: 1, name: "product1", price: 1000, imageUrl: "", category: "" },
    },
    {
      id: 2,
      isSelected: true,
      quantity: 2,
      product: { id: 2, name: "product2", price: 2000, imageUrl: "", category: "" },
    },
  ];

  const cartAmount: Omit<CartAmount, "totalOrderAmount"> = {
    orderAmount: 5000,
    shippingCost: 3000,
  };

  const now = new Date("2024-05-23T12:00:00");

  it("모든 조건을 충족했을 때 선택 가능으로 판정한다.", () => {
    const coupon: BuyXGetYRawCoupon = {
      id: 6,
      code: "BUY2GET1",
      description: "BUY2GET1 테스트 쿠폰",
      expirationDate: "2024-12-31",
      availableTime: { start: "11:59:59", end: "12:00:01" },
      discountType: COUPON_DISCOUNT_TYPE.buyXgetY,
      buyQuantity: 2,
      getQuantity: 1,
    };

    expect(isCouponSelectable(coupon, cartItems, cartAmount, now)).toBe(true);
  });

  it("주문 금액이 minimumAmount 미만일 경우 선택 불가능으로 판정한다.", () => {
    const AMOUNT_OVER_ORDER_AMOUNT = cartAmount.orderAmount + 1;

    const coupon: FixedDiscountRawCoupon = {
      id: 1,
      code: "FIXED1000",
      description: "FIXED1000 테스트 쿠폰",
      expirationDate: "2024-12-31",
      discountType: COUPON_DISCOUNT_TYPE.fixed,
      discount: 1000,
      minimumAmount: AMOUNT_OVER_ORDER_AMOUNT,
    };

    expect(isCouponSelectable(coupon, cartItems, cartAmount, now)).toBe(false);
  });

  it("오늘 날짜가 expirationDate을 지났을 경우 선택 불가능으로 판정한다.", () => {
    const YESTERDAY = "2024-05-22";

    const coupon: FixedDiscountRawCoupon = {
      id: 2,
      code: "FIXED1000",
      description: "FIXED1000 테스트 쿠폰",
      expirationDate: YESTERDAY,
      discountType: COUPON_DISCOUNT_TYPE.fixed,
      discount: 1000,
    };

    expect(isCouponSelectable(coupon, cartItems, cartAmount, now)).toBe(false);
  });

  it("현재 시간이 availableTime 범위 내가 아닐 경우 선택 불가능으로 판정한다.", () => {
    const TIME_RANGE_OUT_OF_NOW = {
      start: "11:00:00",
      end: "12:00:00",
    };

    const coupon: FixedDiscountRawCoupon = {
      id: 3,
      code: "FIXED1000",
      description: "FIXED1000 테스트 쿠폰",
      expirationDate: "2024-12-31",
      discountType: COUPON_DISCOUNT_TYPE.fixed,
      discount: 1000,
      availableTime: TIME_RANGE_OUT_OF_NOW,
    };

    expect(isCouponSelectable(coupon, cartItems, cartAmount, now)).toBe(false);
  });

  it("무료 배송 쿠폰이면서 배송 금액이 0인 경우 선택 불가능으로 판정한다.", () => {
    const coupon: FreeShippingRawCoupon = {
      id: 4,
      code: "FREESHIP",
      description: "FREESHIP 테스트 쿠폰",
      expirationDate: "2024-12-31",
      discountType: COUPON_DISCOUNT_TYPE.freeShipping,
    };

    expect(isCouponSelectable(coupon, cartItems, { orderAmount: 5000, shippingCost: 0 }, now)).toBe(
      false
    );
  });

  it("증정 쿠폰이면서 증정 수량 조건을 충족하지 못한 경우 선택 불가능으로 판정한다.", () => {
    const coupon: BuyXGetYRawCoupon = {
      id: 5,
      code: "BUY2GET1",
      description: "BUY2GET1 테스트 쿠폰",
      expirationDate: "2024-12-31",
      discountType: COUPON_DISCOUNT_TYPE.buyXgetY,
      buyQuantity: 2,
      getQuantity: 1,
    };

    const ELIGIBLE_QUANTITY = coupon.buyQuantity + coupon.getQuantity;

    const ineligibleCartItems: CartItem[] = [
      {
        id: 1,
        isSelected: true,
        quantity: ELIGIBLE_QUANTITY - 1,
        product: { id: 1, name: "product1", price: 1000, imageUrl: "", category: "" },
      },
    ];

    expect(isCouponSelectable(coupon, ineligibleCartItems, cartAmount, now)).toBe(false);
  });
});
