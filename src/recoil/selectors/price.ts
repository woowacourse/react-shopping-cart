import { selector } from "recoil";
import { extremeDeliveryState, selectedCouponsState, couponsState } from "../atoms/cart";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
  EXTREME_DELIVERY_FEE,
} from "../../constants/cart";
import { selectedCartItemsState } from "./cart";

export const deliveryPriceState = selector({
  key: "deliveryFeeState",
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const extremeDelivery = get(extremeDeliveryState);
    if (orderPrice >= DELIVERY_FEE_THRESHOLD) return 0;

    return extremeDelivery ? EXTREME_DELIVERY_FEE : DEFAULT_DELIVERY_FEE;
  },
});

export const orderPriceState = selector({
  key: "orderPriceState",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemsState);
    const orderPrice = selectedCartItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);

    return orderPrice;
  },
});

export const couponDiscountPriceState = selector({
  key: "couponDiscountPriceState",
  get: ({ get }) => {
    /*
      타입별 쿠폰 가격 측정 기준
      fixed: 고정 금액 할인 
      buyXgetY: buyQuantity개 구입시 getQuantity개 만큼 증정, 복수개인 경우 가격이 가장 큰 품목
      freeShipping: 배송비 무료 
      percentage: percentage만큼 할인

    */

    const selectedCoupons = get(selectedCouponsState);
    const coupons = get(couponsState);
    const deliveryPrice = get(deliveryPriceState);
    const orderPrice = get(orderPriceState);
    const selectedCartItems = get(selectedCartItemsState);

    let couponDiscountPrice = 0;

    coupons
      .filter((coupon) => selectedCoupons.includes(coupon.id))
      .forEach((coupon) => {
        switch (coupon.discountType) {
          case "fixed":
            if (coupon.discount) {
              couponDiscountPrice += coupon.discount;
            }
            break;

          case "buyXgetY":
            couponDiscountPrice += Math.max(
              ...selectedCartItems
                .filter(
                  (item) =>
                    coupon.buyQuantity &&
                    coupon.getQuantity &&
                    item.quantity >= coupon.buyQuantity + coupon.getQuantity
                )
                .map((item) => item.product.price)
            );
            break;

          case "freeShipping":
            couponDiscountPrice += deliveryPrice;
            break;

          case "percentage":
            if (coupon.discount) {
              couponDiscountPrice += orderPrice * (coupon.discount / 100);
            }
            break;

          default:
            throw new Error("존재하지 않는 쿠폰 타입입니다");
        }
      });

    return Math.min(orderPrice, couponDiscountPrice);
  },
});

export const paymentPriceState = selector({
  key: "paymentPriceState",
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const deliveryPrice = get(deliveryPriceState);
    const couponDiscountPrice = get(couponDiscountPriceState);
    return orderPrice + deliveryPrice - couponDiscountPrice;
  },
});
