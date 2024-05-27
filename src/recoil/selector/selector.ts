import { selector } from "recoil";
import { DELIVERY } from "../../constants";
<<<<<<< HEAD
import { CartItem, CartSummary } from "../../types";
import {
  cartItemsState,
  checkedItemState,
  couponsState,
  isShippingRegionCheckedState,
} from "../atoms/atoms";
=======
import { CartSummary } from "../../types";
import { cartItemsState, checkedItemState } from "../atoms/atoms";
>>>>>>> 00kang

export const cartSummarySelectorState = selector<CartSummary>({
  key: "cartSummarySelectorState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = get(checkedItemState);
<<<<<<< HEAD
    const isShippingRegionChecked = get(isShippingRegionCheckedState);
=======
>>>>>>> 00kang

    const checkedCartItems = cartItems.filter((item) => checkedItems[item.id]);

    const orderPrice = checkedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
<<<<<<< HEAD

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
=======
    const deliveryPrice =
      orderPrice === 0 || orderPrice >= DELIVERY.FREE_THRESHOLD ? DELIVERY.FREE : DELIVERY.STANDARD;
    const totalPrice = orderPrice + deliveryPrice;
>>>>>>> 00kang

    const uniqueItemCount = checkedCartItems.length;
    const totalItemCount = checkedCartItems.reduce((total, item) => total + item.quantity, 0);

    return {
      cartItems,
      orderPrice,
<<<<<<< HEAD
      cartDeliveryPrice,
      orderDeliveryPrice,
      cartTotalPrice,
      orderTotalPrice,
=======
      deliveryPrice,
      totalPrice,
>>>>>>> 00kang
      uniqueItemCount,
      totalItemCount,
    };
  },
});
<<<<<<< HEAD

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
=======
>>>>>>> 00kang
