import { selector } from "recoil";
import { DELIVERY } from "../../constants";
import { CartItem, CartSummary } from "../../types";
import {
  cartItemsState,
  checkedItemState,
  couponsState,
  isShippingRegionCheckedState,
} from "../atoms/atoms";

export const cartSummarySelectorState = selector<CartSummary>({
  key: "cartSummarySelectorState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = get(checkedItemState);
    const isShippingRegionChecked = get(isShippingRegionCheckedState);

    const checkedCartItems = cartItems.filter((item) => checkedItems[item.id]);

    const orderPrice = checkedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const cartDeliveryPrice =
      orderPrice === 0 || orderPrice >= DELIVERY.FREE_THRESHOLD ? DELIVERY.FREE : DELIVERY.STANDARD;

    const orderDeliveryPrice =
      orderPrice === 0 || orderPrice >= DELIVERY.FREE_THRESHOLD
        ? DELIVERY.FREE
        : isShippingRegionChecked
          ? DELIVERY.REGION_SPECIFIC
          : DELIVERY.STANDARD;

    const cartTotalPrice = orderPrice + cartDeliveryPrice;
    const orderTotalPrice = orderPrice + orderDeliveryPrice;

    const uniqueItemCount = checkedCartItems.length;
    const totalItemCount = checkedCartItems.reduce((total, item) => total + item.quantity, 0);

    return {
      cartItems,
      orderPrice,
      cartDeliveryPrice,
      orderDeliveryPrice,
      cartTotalPrice,
      orderTotalPrice,
      uniqueItemCount,
      totalItemCount,
    };
  },
});

export const selectedCartItemsSelectorState = selector<CartItem[]>({
  key: "selectedCartItemsSelectorState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = get(checkedItemState);

    return cartItems.filter((item) => checkedItems[item.id]);
  },
});

export const couponListSelectorState = selector({
  key: "couponListSelectorState",
  get: ({ get }) => {
    const coupons = get(couponsState);

    return coupons;
  },
});
