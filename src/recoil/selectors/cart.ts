import { selector } from "recoil";
import { selectedListState, cartItemsState, couponsState } from "../atoms/cart";

import { isInTimeRange, isValidDate } from "../../utils/date";
import { deliveryPriceState, orderPriceState } from "./price";

export const possibleCouponListState = selector({
  key: "possibleCouponListState",
  get: ({ get }) => {
    const coupons = get(couponsState);
    const selectedCartItems = get(selectedCartItemsState);
    const orderPrice = get(orderPriceState);

    const deliveryPrice = get(deliveryPriceState);

    return coupons
      .filter((coupon) => {
        if (!isValidDate(coupon.expirationDate)) return false;

        if (coupon.discountType === "fixed" && coupon.minimumAmount) {
          return orderPrice >= coupon.minimumAmount;
        } else if (coupon.discountType === "buyXgetY" && coupon.buyQuantity && coupon.getQuantity) {
          const buyQuantity = coupon.buyQuantity;
          const getQuantity = coupon.getQuantity;
          return selectedCartItems.some((item) => item.quantity >= buyQuantity + getQuantity);
        } else if (
          coupon.discountType === "freeShipping" &&
          deliveryPrice &&
          coupon.minimumAmount
        ) {
          return orderPrice >= coupon.minimumAmount;
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
