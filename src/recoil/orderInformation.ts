import { selector } from "recoil";

import { cartItems } from "./cartItems";
import {
  selectedCartItemSelector,
  selectedCartItemsQuantitySelector,
} from "./selectedCardItems";
import { cartItemQuantity } from "./cartItemQuantity";
import { shippingFeeSelector } from "./shippingFee";
import { selectedCouponState } from "./coupon";

import calculateDiscountAmount from "@/domains/calculateDiscountAmount";

export const totalOrderPriceSelector = selector({
  key: "totalOrderPriceSelector",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemSelector);

    const totalPrice = [...selectedCartItems].reduce((accPrice, currItem) => {
      const currentQuantity = get(cartItemQuantity(currItem.id));

      accPrice += currentQuantity * currItem.product.price;

      return accPrice;
    }, 0);

    return totalPrice;
  },
});

export const totalItemLengthSelector = selector({
  key: "totalItemLengthSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItems);

    return cartItemList.length;
  },
});

export const discountAmountSelector = selector<number>({
  key: "discountAmountSelector",
  get: ({ get }) => {
    const cartItemsState = get(cartItems);
    const selectedCoupons = get(selectedCouponState);

    const totalOrderPrice = get(totalOrderPriceSelector);
    const selectedCartItemsQuantity = get(selectedCartItemsQuantitySelector);
    const shippingFee = get(shippingFeeSelector);

    const discountAmount = selectedCoupons.reduce(
      (accDiscountAmount, coupon) => {
        return (
          accDiscountAmount +
          calculateDiscountAmount(
            coupon,
            totalOrderPrice,
            cartItemsState,
            selectedCartItemsQuantity,
            shippingFee
          )
        );
      },
      0
    );

    return discountAmount;
  },
});

export const totalPaymentAmountSelector = selector({
  key: "totalPaymentAmountSelector",
  get: ({ get }) => {
    const orderPrice = get(totalOrderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    const totalDiscountAmount = get(discountAmountSelector);

    return orderPrice + shippingFee - totalDiscountAmount;
  },
});
