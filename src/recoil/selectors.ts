import { selector } from 'recoil';
import {
  cartData,
  cartItemCheckState,
  discountPrice,
  isIslandState,
} from './atoms';
import { fetchCartItem, fetchCoupon } from '../api';
import { RULE } from '../constants/rule';

export const fetchCartData = selector<Cart[]>({
  key: 'fetchCartData',
  get: async () => {
    const cartData = await fetchCartItem();
    return cartData;
  },
});

export const allCartItemsCheckState = selector<boolean>({
  key: 'allCartItemsCheckState',
  get: ({ get }) => {
    const cart = get(cartData);
    return cart.every((cartItem) => get(cartItemCheckState(cartItem.id)));
  },
  set: ({ set, get }, newValue) => {
    const cart = get(cartData);
    cart.forEach((cartItem) => {
      set(cartItemCheckState(cartItem.id), newValue);
    });
  },
});

export const checkedCartItems = selector({
  key: 'checkedCartItems',
  get: ({ get }) => {
    const cart = get(cartData);
    const isCheckedCartItems = cart.filter((cartItem) =>
      get(cartItemCheckState(cartItem.id)),
    );
    return isCheckedCartItems;
  },
});

export const calculateOrderPrice = selector<Price>({
  key: 'calculateOrderPrice',
  get: ({ get }) => {
    const checkedCart = get(checkedCartItems);
    const isIsland = get(isIslandState);

    const totalOrderPrice = checkedCart.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );

    const deliveryFee =
      totalOrderPrice >= RULE.minimumFreeShippingOrderPrice ||
      totalOrderPrice === 0
        ? RULE.freeShipping
        : isIsland
          ? RULE.isLandDeliveryFee
          : RULE.defaultDeliveryFee;

    const totalPrice = totalOrderPrice + deliveryFee;

    return { totalOrderPrice, deliveryFee, totalPrice };
  },
});

export const fetchCouponList = selector<Coupon[]>({
  key: 'fetchCouponList',
  get: async () => {
    const couponData = await fetchCoupon();
    return couponData;
  },
});

export const totalPaymentPrice = selector<number>({
  key: 'totalPaymentPrice',
  get: ({ get }) => {
    const { totalPrice } = get(calculateOrderPrice);
    const totalDiscount = get(discountPrice);
    return totalPrice - totalDiscount;
  },
});
