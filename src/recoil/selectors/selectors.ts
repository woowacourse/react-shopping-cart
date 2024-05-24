import { selector } from "recoil";
import {
  selectedListState,
  cartItemsState,
  extremeDeliveryState,
  selectedCouponsState,
  couponsState,
} from "../atoms/atoms";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
  EXTREME_DELIVERY_FEE,
} from "../../constants/cart";

import { isInTimeRange, isValidDate } from "../../utils/date";

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

export const deliveryFeeState = selector({
  key: "deliveryFeeState",
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const extremeDelivery = get(extremeDeliveryState);
    if (orderPrice >= DELIVERY_FEE_THRESHOLD) return 0;

    return extremeDelivery ? EXTREME_DELIVERY_FEE : DEFAULT_DELIVERY_FEE;
  },
});

export const possibleCouponListState = selector({
  key: "possibleCouponListState",
  get: ({ get }) => {
    const coupons = get(couponsState);
    const selectedCartItems = get(selectedCartItemsState);
    const orderPrice = get(orderPriceState);

    const deliveryFee = get(deliveryFeeState);

    return coupons
      .filter((coupon) => {
        if (!isValidDate(coupon.expirationDate)) return false;

        if (coupon.discountType === "fixed" && coupon.minimumAmount) {
          return orderPrice > coupon.minimumAmount;
        } else if (coupon.discountType === "buyXgetY" && coupon.buyQuantity) {
          return selectedCartItems.length >= coupon.buyQuantity;
        } else if (coupon.discountType === "freeShipping" && deliveryFee && coupon.minimumAmount) {
          return orderPrice > coupon.minimumAmount;
        } else if (
          coupon.discountType === "percentage" &&
          coupon.availableTime?.start &&
          coupon.availableTime?.end
        ) {
          return isInTimeRange(coupon.availableTime?.start, coupon.availableTime?.end);
        }
        return false;
      })
      .map((coupon) => coupon.id);
  },
});

export const couponDiscountPriceState = selector({
  key: "couponDiscountPriceState",
  get: ({ get }) => {
    const selectedCoupons = get(selectedCouponsState);
    const coupons = get(couponsState);
    const deliveryFee = get(deliveryFeeState);
    const orderPrice = get(orderPriceState);
    const selectedCartItems = get(selectedCartItemsState);

    let couponDiscountPrice = 0;
    coupons
      .filter((coupon) => selectedCoupons.includes(coupon.id))
      .forEach((coupon) => {
        if (coupon.discountType === "fixed" && coupon.discount) {
          couponDiscountPrice += coupon.discount;
        } else if (coupon.discountType === "buyXgetY") {
          couponDiscountPrice += Math.max(...selectedCartItems.map((item) => item.product.price));
        } else if (coupon.discountType === "freeShipping") {
          couponDiscountPrice += deliveryFee;
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
    const deliveryFee = get(deliveryFeeState);
    const couponDiscountPrice = get(couponDiscountPriceState);
    return orderPrice + deliveryFee - couponDiscountPrice;
  },
});

export const selectedCartItemsState = selector({
  key: "selectedCartItemsState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedList = get(selectedListState);
    return cartItems.filter((cartItem) => selectedList.includes(cartItem.id));
  },
});

export const cartSummaryState = selector({
  key: "cartSummaryState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItems = get(selectedCartItemsState);
    const cartItemKind = cartItems.length;

    const cartItemSelectedKind = selectedCartItems.length;
    const cartItemSelectedQuantity = selectedCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    return { cartItemKind, cartItemSelectedQuantity, cartItemSelectedKind };
  },
});
