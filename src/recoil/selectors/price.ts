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
    const selectedCoupons = get(selectedCouponsState);
    const coupons = get(couponsState);
    const deliveryPrice = get(deliveryPriceState);
    const orderPrice = get(orderPriceState);
    const selectedCartItems = get(selectedCartItemsState);

    let couponDiscountPrice = 0;
    coupons
      .filter((coupon) => selectedCoupons.includes(coupon.id))
      .forEach((coupon) => {
        if (coupon.discountType === "fixed" && coupon.discount) {
          couponDiscountPrice += coupon.discount;
        } else if (coupon.discountType === "buyXgetY") {
          couponDiscountPrice += Math.max(
            ...selectedCartItems
              .filter((item) => item.quantity >= 3)
              .map((item) => item.product.price)
          );
        } else if (coupon.discountType === "freeShipping") {
          couponDiscountPrice += deliveryPrice;
        } else if (coupon.discountType === "percentage" && coupon.discount) {
          couponDiscountPrice += orderPrice * (coupon.discount / 100);
        } else {
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
